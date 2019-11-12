let baseURL = "http://118.25.222.68:5757/";

export function requestData(thisURL){
     return new Promise((resolve,reject)=>{
        wx.request({
          url: baseURL+thisURL,
          success(res){
            resolve(res);
          },
          fail(error){
            reject(error);
          }
        })
     });
}
