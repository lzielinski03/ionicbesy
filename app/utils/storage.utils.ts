const RRMM_APP_ACCOUNT:string = 'RRMM-APP-ACCOUNT';
const RRMM_APP_TOKEN:string = 'RRMM-APP-TOKEN';

export class StorageUtils {

    static getItem(itemName:string):any {
        return JSON.parse(localStorage.getItem(itemName));
    }

    static hasToken():boolean {
        return !!this.getItem(RRMM_APP_TOKEN);
    }

    static getToken():string {
        if(this.hasToken()) {
            return this.getItem(RRMM_APP_TOKEN);
        }
    }

    static setToken(token:string):void {
        localStorage.setItem(RRMM_APP_TOKEN,JSON.stringify(token));
    }

    static removeToken():void {
        localStorage.removeItem(RRMM_APP_TOKEN);
    }

    static hasAccount():boolean {
        return !!this.getItem(RRMM_APP_ACCOUNT);
    }

    static getAccount():any {
        if(this.hasAccount()) {
            return this.getItem(RRMM_APP_ACCOUNT);
        }
    }
    
    static setAccount(account:any):void {
        localStorage.setItem(RRMM_APP_ACCOUNT,JSON.stringify(account));
    }

    static removeAccount():void {
        localStorage.removeItem(RRMM_APP_ACCOUNT);
    }
}