import Spaceinf from "./Spaceinf";
import Sort from "./Sort";

export default function SystemMessage(code: string, inf: Spaceinf) {
    if(code == "beginning") {
        return(
            <div>
                β版となりますので、サイトの込み具合によっては検索できない場合があります。
                <br/>
                ご了承ください。
            </div>);
    }else if(code == "no result") {
        return(<div><span id = "error">※検索エラー※</span><br/>該当結果がありません</div>);
    }else if(code == "loading") {
        return(<div className="loader">Loading...</div>);
    }else if(code == "update" || code == "number") {
        return(Sort(inf, code));
    }else {
        return(<div><span id = "error">※検索エラー※</span><br/>大変申し訳ございません。時間をおいてお試しください</div>);
    }
}
