export interface ConfigType {
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
}

export interface BlogPost {
  id: string;
  userName: string;
  title: string;
  description: string;
  image?: string;
  time: string;
  totalReadTime?: string;
  useProfilePicture?:string;
  user_id?:number
}

export interface PayloadData {
  userName?: string;
  title?: string;
  description?: string;
  image?: any;
  totalReadTime?: string;
}
