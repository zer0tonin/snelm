export interface RequestResponseInterface {
	getRequestHeader(
		headerKey: string
	) : string;
	
	getResponseHeader(
		headerKey: string
	) : string;
	
	setResponseHeader(
		headerKey: string, 
		headerValue: string
	) : void;
	
	removeResponseHeader(
		headerKey: string
	) : void;
}