import Spaceinf from "./Spaceinf";

export default function Twitter(spaces : Spaceinf) {
  var twitterList = [];
  twitterList.push(<div id="resulutnum">検索結果: {spaces.resultcount}件<br/></div>);

  for(let i = 0; i < spaces.resultcount; i++){
    twitterList.push(space(i , spaces));
  }
  if(spaces.resultcount == 0){
    twitterList.push(<div>該当するスペースはありません。</div>)
  }else {
    twitterList.push(<div id = "foot"></div>);
  }
  return twitterList;
}

function space(num : number, inf: Spaceinf) {
  if(num >= inf.resultcount) return "";
  const spaceUrl = "https://twitter.com/i/spaces/" + inf.id[num]; 

  return(
  <div className = "card">
  <div className = "accountInf">
    <input type = "image" src = {inf.profile_image_url[num]} id = "icon"></input>
    <div className = "name"> {inf.twname[num]}<br/>(@{inf.username[num]}) </div>
  </div>
  <a href={spaceUrl}  target="_blank" rel="noopener noreferrer">
    <div className = "space">
      <div className = "spaceT">
        {inf.title[num]}
      </div>
      <div className = "listen">
        聞いてみる
      </div>
    </div>
  </a>
  <div className = "number">
    更新日時: {inf.updated_at[num]}<br/>ルーム人数: {inf.participant_count[num] + 1}人
  </div>
</div>
  );
}
