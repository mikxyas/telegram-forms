import { Query } from "appwrite";
import { account, database, functions } from "../appwrite/Appwrite"
import { setStorageItem } from "./setStorageItem"

export async function getUserData(telegram_id: string) {    
    // if session already exists just fetch the forms direcrly
    const user = await account.get();
    if(!user){
 
        const promise = await functions.createExecution(
    '66a4ab4e0026fb046d0c',
    telegram_id,
    )
    const resp = JSON.parse(promise.responseBody)
    console.log(resp)
    if (resp.status === 'success') {
    const secret = resp.secret
    setStorageItem('secret', secret)
    const session = await account.createSession(
        telegram_id.toString(),
        secret,
    ).then((res) => {
        console.log(res)
    })
}
return resp.data.forms
    }else{
        const forms = await database.listDocuments(
            "66a0bb690022ca66f9c3",
            '66a0bb9e0034dbfdde6d',                // Collection ID
            [
                Query.equal("creator", telegram_id)
            ]          // Document ID
        );
        return forms.documents
    }
}