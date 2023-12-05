import {Injectable} from '@angular/core';

@Injectable()
export class Constants{

    public readonly UserAPIEndPoint:string = 'http://localhost:3001';
    public readonly AdminAPIEndPoint:string = 'http://localhost:3001/admin';
    public readonly TurfOwnerAPIEndPoint:string = 'http://localhost:3001/turfAdmin';

}