#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::collections::HashMap;
use firebase_rs::*;
use serde::{Deserialize, Serialize};
use sha256::digest;
#[derive(Serialize, Deserialize, Debug)]
struct User {
    email: String,
    password: String,
    sub_type: i32,
    datasets: String,
    //Remember_Token :bool
}

struct filepath{
    path:String,
}

#[derive(Serialize, Deserialize, Debug)]
struct Response {
    name: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct Confirmation{

    value : bool,
    response : String,

}

#[derive(Serialize, Deserialize, Debug)]
struct User_Fetch{
    value:bool,
    user:User,
} 

fn main() {
  tauri::Builder::default().invoke_handler(tauri::generate_handler![create_user])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

async fn initConnection() -> Firebase{

  let firebase =
  Firebase::new("https://ezhire-c4044-default-rtdb.asia-southeast1.firebasedatabase.app/")
      .unwrap();

  return firebase;

}

#[tauri::command]
async fn create_user( mail:String, pwd:String ) ->String {

  let firebase_client = initConnection().await;
  let x = user_exist(&mail).await;

  let mut R = Confirmation{
    value:false,
    response : String::from("")
  };

  if x {
    R.response = String::from("A user with this email already exists on EZHire");
  }else{
    R.response = String::from("Successfully Registered. Please check your email for a verification code");
    R.value = true;
    let _firebase = firebase_client.at("Users");
    let user = User{
      email: mail,
      password: digest(String::from(pwd)),
      sub_type: 0,
      datasets: String::from(""),
    };
    let _users = _firebase.set::<User>(&user).await;
  }

  let g =  serde_json::to_string(&R).unwrap();
  return g.into()
  
}

fn string_to_response(s: &str) -> Response {
  serde_json::from_str(s).unwrap()
}

fn string_to_user(s: &str) -> User {
  serde_json::from_str(s).unwrap()
}

async fn user_exist(email : &String) -> bool{

  let users = get_users().await;

  for (key, value) in users.into_iter() {
      if value.email == *email {
          return true;
      }
  }
  return false;

}

async fn get_users() -> HashMap<String, User> {
  let firebase = initConnection().await;
  let firebase = firebase.at("Users");
  let users = firebase.get::<HashMap<String, User>>().await;

  let _users= match users{
      Ok(users) => return users,
      Err(_err) =>{
          let temp = HashMap::new();
          return temp;
      }
  };
}