import Spaceinf from "./Spaceinf";
import Forspaces from "./Forspaces";


export default function Sort(spaces: Spaceinf, radioText: string) {
  if(radioText == "update") {
    return Forspaces(updateSort(spaces));
  }else if(radioText = "number") {
    return Forspaces(numberSort(spaces));
  }
}

//Sort by update order
function updateSort(spaces: Spaceinf) {
  var inf: Spaceinf = {
    creator_id: [""],
    id: [""],
    participant_count: [0],
    title: [""],
    updated_at: [""],
    updated_at_dt: spaces.updated_at_dt,
    twname: [""],
    username: [""],
    profile_image_url: [""],
    resultcount: spaces.resultcount
  };

  let arraynum =[];
  let sort = new Date();
  let sortnum = 0;
  let num = 0;
  let bool = true;

  for(let i = 0; i < inf.resultcount; i++){
    arraynum.push(i);
  }

  
  for(let i = 0; i < inf.resultcount; i++){
    for(let j = i; j < inf.resultcount; j++){
      if(j == i){
        sort = inf.updated_at_dt[j];
        num = j;
      }else if(j > i){
        if(sort.getTime() < inf.updated_at_dt[j].getTime()){
          sort = inf.updated_at_dt[j];
          num = j;
        }
      }
    }

    inf.updated_at_dt[num] = inf.updated_at_dt[i];
    inf.updated_at_dt[i] = sort;
    sortnum = arraynum[num];
    arraynum[num] = arraynum[i];
    arraynum[i] = sortnum;

    if(bool) {
      inf.creator_id.shift();
      inf.id.shift();
      inf.participant_count.shift();
      inf.title.shift();
      inf.updated_at.shift();
      inf.twname.shift();
      inf.username.shift();
      inf.profile_image_url.shift();
      bool = false;
    }

    inf.creator_id.push(spaces.creator_id[arraynum[i]]);
    inf.id.push(spaces.id[arraynum[i]]);
    inf.participant_count.push(spaces.participant_count[arraynum[i]]);
    inf.title.push(spaces.title[arraynum[i]]);
    inf.updated_at.push(spaces.updated_at[arraynum[i]]);
    inf.twname.push(spaces.twname[arraynum[i]]);
    inf.username.push(spaces.username[arraynum[i]]);
    inf.profile_image_url.push(spaces.profile_image_url[arraynum[i]]);
  }

  return inf;

}

//Sort by room size
function numberSort(spaces: Spaceinf) {
  var inf: Spaceinf = {
    creator_id: [""],
    id: [""],
    participant_count: spaces.participant_count,
    title: [""],
    updated_at: [""],
    updated_at_dt: [new Date()],
    twname: [""],
    username: [""],
    profile_image_url: [""],
    resultcount: spaces.resultcount
  };

  let arraynum =[];
  let sort = 0;
  let sortnum = 0;
  let num = 0;
  let bool = true;

  for(let i = 0; i < inf.resultcount; i++){
    arraynum.push(i);
  }

  for(let i = 0; i < inf.resultcount; i++){
    for(let j = i; j < inf.resultcount; j++){
      if(j == i){
        sort = inf.participant_count[j];
        num = j;
      }else if(j > i){
        if(sort < inf.participant_count[j]){
          sort = inf.participant_count[j];
          num = j;
        }
      }
    }
    inf.participant_count[num] = inf.participant_count[i];
    inf.participant_count[i] = sort;
    sortnum = arraynum[num];
    arraynum[num] = arraynum[i];
    arraynum[i] = sortnum;


    if(bool) {
      inf.creator_id.shift();
      inf.id.shift();
      inf.title.shift();
      inf.updated_at.shift();
      inf.updated_at_dt.shift();
      inf.twname.shift();
      inf.username.shift();
      inf.profile_image_url.shift();
      bool = false;
    }

    inf.creator_id.push(spaces.creator_id[arraynum[i]]);
    inf.id.push(spaces.id[arraynum[i]]);
    inf.title.push(spaces.title[arraynum[i]]);
    inf.updated_at.push(spaces.updated_at[arraynum[i]]);
    inf.updated_at_dt.push(spaces.updated_at_dt[arraynum[i]]);
    inf.twname.push(spaces.twname[arraynum[i]]);
    inf.username.push(spaces.username[arraynum[i]]);
    inf.profile_image_url.push(spaces.profile_image_url[arraynum[i]]);
  }
  return inf;
}


  