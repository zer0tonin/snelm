import { RequestResponseInterface } from "./interface.ts";

export default class PogoRequestResponse implements RequestResponseInterface {
	
	private _request: any;
	private _response: any;
	
	constructor(request: any, response: any) {
		this._request = request;
		this._response = response;
	}
	
	public getRequestHeader(headerKey: string) : string {
		return this._request.headers[headerKey];
	}
	
	public getResponseHeader(headerKey: string) : string {
		return this._response.headers[headerKey];
	}
	
	public setResponseHeader(headerKey: string, headerValue: string) : void {
		this._response.header(headerKey, headerValue);
	}
	
	public removeResponseHeader(headerKey: string) : void {
		delete this._response.headers[headerKey];
	}
	
	get request() : any {
		return this._request;
	}
	
	get response() : any {
		return this._response;
	}
}