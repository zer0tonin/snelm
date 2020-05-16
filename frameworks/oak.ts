import { RequestResponseInterface } from "./interface.ts";

export default class OakRequestResponse implements RequestResponseInterface {
	
	private _request: any;
	private _response: any;
	
	constructor(request: any, response: any) {
		this._request = request;
		this._response = response;
	}
	
	public getRequestHeader(headerKey: string) : string {
		return this._request.headers.get(headerKey); 
	}
	
	public getResponseHeader(headerKey: string) : string {
		return this._response.headers.get(headerKey);
	}
	
	public setResponseHeader(headerKey: string, headerValue: string) : void {
		this._response.headers.set(headerKey, headerValue);
	}
	
	public removeResponseHeader(headerKey: string) : void {
		this._response.headers.delete(headerKey);
	}
	
	get request() : any {
		return this._request;
	}
	
	get response() : any {
		return this._response;
	}
}