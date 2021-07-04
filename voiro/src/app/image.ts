export interface Image {
		id:string;
		title:string;
		url_viewer:string;
		url:string;
		display_url:string;
		size:string;
		time:string;
		expiration:string;
		image:{
			filename:string;
			name:string;
			mime:string;
			extension:string;
			url:string;
		}
		thumb:{
			filename:string;
			name:string;
			mime:string;
			extension:string;
			url:string;	
		}
		delete_url:string;

}
