import {Headers, Request, RequestOptionsArgs, Response} from '@angular/http';
import {Router} from '@angular/router';
import {OAuthService} from 'app/shared/service/oauth.service';
import {Observable} from 'rxjs/Observable';
import {EmptyObservable} from 'rxjs/observable/EmptyObservable';
import {Subscriber} from 'rxjs/Subscriber';
import {Resource, Resources} from "./hal/hal.model";

export interface RestTransform {
    (response: Response): any;
}

export interface RestConfig {
    baseHeaders?: Headers;
    dynamicHeaders?: () => Headers;
    baseUrl: string;
    path?: string;
    transform?: RestTransform;
}

export interface URLParams {
    [key: string]: any | any[];
}

export interface Http {
    delete: (url: string, options?: RequestOptionsArgs) => Observable<Response>;
    get: (url: string, options?: RequestOptionsArgs) => Observable<Response>;
    head: (url: string, options?: RequestOptionsArgs) => Observable<Response>;
    patch: (url: string, body: any, options?: RequestOptionsArgs) => Observable<Response>;
    post: (url: string, body: any, options?: RequestOptionsArgs) => Observable<Response>;
    put: (url: string, body: any, options?: RequestOptionsArgs) => Observable<Response>;
    request: (url: string | Request, options?: RequestOptionsArgs) => Observable<Response>;
}

export abstract class RESTService<T extends Resource> {

    constructor(protected http: Http, protected config: RestConfig, protected router: Router, protected oAuthService: OAuthService) {
        this.config.baseUrl = config.baseUrl.replace(/\/$/, '');
        this.config.path = config.path.replace(/^\//, '');
        this.config.baseHeaders = config.baseHeaders ? this.config.baseHeaders : new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + oAuthService.getToken()
        });
        this.config.dynamicHeaders = config.dynamicHeaders ? this.config.dynamicHeaders : () => new Headers();
        this.config.transform = config.transform ? this.config.transform : (response: Response): any => response.json();
    }

    public query(params?: URLParams | URLSearchParams, transform?: RestTransform): Observable<Resources<T>> {
        let request: Observable<Response> = this.http.get(this.buildUrl(undefined), this.buildRequestOptions(params));
        return request.map((res: Response) => {
            if (transform) {
                return transform(res);
            }
            return this.config.transform(res);
        }).catch((error: Response) => {
            return this.errorInterceptor(error);
        });
    }

    public get(id: string | number, transform?: RestTransform): Observable<T> {
        let request: Observable<Response> = this.http.get(this.buildUrl(id), this.buildRequestOptions());
        return request.map((res: Response) => {
            if (transform) {
                return transform(res);
            }
            return this.config.transform(res);
        }).catch((error: Response) => {
            return this.errorInterceptor(error);
        });
    }

    public create(obj: T, transform?: RestTransform): Observable<T> {
        let request: Observable<Response> = this.http.post(this.buildUrl(), obj, this.buildRequestOptions());
        return request.map((res: Response) => {
            if (res.status === 201) {
                if (transform) {
                    return transform(res);
                }
                return this.config.transform(res);
            } else {
                return res;
            }
        }).catch((error: Response) => {
            return this.errorInterceptor(error);
        });
    }

    public update(id: string | number, obj: T, transform?: RestTransform): Observable<T> {
        let requestOptions: RequestOptionsArgs = this.buildRequestOptions();
        let request: Observable<Response> = this.http.patch(this.buildUrl(id), obj, requestOptions);
        return request.map((res: Response) => {
            if (res.status === 200) {
                if (transform) {
                    return transform(res);
                }
                return this.config.transform(res);
            } else {
                return res;
            }
        }).catch((error: Response) => {
            return this.errorInterceptor(error);
        });
    }

    public delete(id: string | number, transform?: RestTransform): Observable<T> {
        let request: Observable<Response> = this.http.delete(this.buildUrl(id), this.buildRequestOptions());
        return request.map((res: Response) => {
            if (res.status === 200) {
                if (transform) {
                    return transform(res);
                }
                return this.config.transform(res);
            } else {
                return res;
            }
        }).catch((error: Response) => {
            return this.errorInterceptor(error);
        });
    }

    protected errorInterceptor(error: Response): Observable<T> {
        if (error.status === 401 || error.status === 0) {
            this.oAuthService.logout(this.router.url);
            return new EmptyObservable<T>();
        } else {
            return new Observable<any>((subscriber: Subscriber<any>) => {
                try {
                    subscriber.error(this.config.transform(error));
                } catch (err) {
                    subscriber.error(error);
                }
            });
        }
    }

    protected buildRequestOptions(params?: URLParams | URLSearchParams): RequestOptionsArgs {
        let requestHeaders: Headers = new Headers();
        this.config.baseHeaders.forEach((value: string[], key: string) => {
            requestHeaders.set(key, value);
        });
        this.config.dynamicHeaders().forEach((value: string[], key: string) => {
            requestHeaders.set(key, value);
        });
        let requestOptions: RequestOptionsArgs = {
            headers: requestHeaders,
            params: params
        };
        return requestOptions;
    }

    protected buildUrl(id?: string | number): string {
        let url: string = this.config.path ? this.config.path : '';
        if (id) {
            url += `/${id}`;
        }
        url = `${this.config.baseUrl}/${url}`;
        return url;
    }
}
