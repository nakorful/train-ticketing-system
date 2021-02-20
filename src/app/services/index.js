import * as restService from "./restService"
import * as localService from "./localService"


export default {
    ...localService,
    ...restService
}