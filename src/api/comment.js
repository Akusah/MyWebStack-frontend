import axios from "axios";
import { ElMessage } from "element-plus";
import router from "@/router";

const authItemName = "access_token"

//取出token
const takeAccessToken = () =>{
  const str = localStorage.getItem(authItemName)
  if(!str) return null
  const authObj = JSON.parse(str)
  if(authObj.expire <= new Date()){
    deleteAccessToken()
    ElMessage.warning('登录状态已过期，请重新登录')
    return null
  }
  return authObj.token
}

const deleteAccessToken = () => {
  localStorage.removeItem(authItemName)
}

const instance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 2000,
    transformRequest: [
      (data, headers) => {
        if (headers["Content-Type"] === "application/x-www-form-urlencoded") {
          const formData = new URLSearchParams();
          for (const key in data) {
            formData.append(key, data[key]);
          }
          return formData.toString();
        }
        return JSON.stringify(data);
      },
    ],
  });



  export const getCommentByWebId = async (webId,currentPage) => {
    try {
      const response = await instance.get("sys/comment/getCommentByWebId/"+ webId+`?currentPage=${currentPage}`, {
        headers: {
          'Authorization': `Bearer ${takeAccessToken()}`,
        },
        withCredentials:true
      });
      const { code, message, data } = response.data;
      if (code === 200) {
        return data
      } else {
        ElMessage.error(message);
      }
    } catch (error) {
      console.error(error);
      ElMessage.error("获取失败！");
    }
  };


  export const PostComment = async (requestBody) => {
    console.log(requestBody);
    try {
      const response = await instance.post("/sys/comment/posted", requestBody, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${takeAccessToken()}`,
        },
        withCredentials:true
      });
      const { code, message, data } = response.data;
      if (code === 200) {
        ElMessage.success(message);  
      } else {
        ElMessage.error(message);
      }
    } catch (error) {
      console.error(error);
      ElMessage.error("网络错误，请稍后重试！");
    }
  };



  //管理员方法
  export const getAllComments = async (currentPage) => {
    try {
      const response = await instance.get("/api/admin/getCommentsByPage"+`?currentPage=${currentPage}`, {
        headers: {
          'Authorization': `Bearer ${takeAccessToken()}`,
        },
        withCredentials:true
      });
      const { code, message, data } = response.data;
      if (code === 200) {
        return data;
      } else {
        ElMessage.error(message);
      }
    } catch (error) {
      console.error(error);
      ElMessage.error("网络错误，请稍后重试！");
    }
  };