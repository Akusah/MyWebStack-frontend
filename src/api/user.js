import axios from "axios";
import { ElMessage } from "element-plus";
import router from "@/router";
// import store from '@/store'


const authItemName = "access_token"
//存储token
const storeAccessToken = (token,expire) =>{
  const authObj = {token: token,expire: expire}
  const str = JSON.stringify(authObj)
  localStorage.setItem(authItemName,str)
}

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

export const unauthorized = () => {
    return !takeAccessToken()
}

export const loginApiUser = async (requestBody) => {
  try {
    const response = await instance.post("/api/auth/login", requestBody, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      withCredentials:true
    });
    const { code, message, data } = response.data;
    if (code === 200) {
      storeAccessToken(data.token,data.expire)
      ElMessage.success("登录成功！");
      if (data.role === "admin"){
        router.push('/admin')
      } else{
        router.push('/index')
      }
    } else {
      ElMessage.error(message);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error("网络错误，请稍后重试！");
  }
};



export const logoutApiUser = async () => {
  try {
    const response = await instance.get("/api/auth/logout", {
      headers: {
        'Authorization': `Bearer ${takeAccessToken()}`,
      },
      withCredentials:true
    });
    const { code, message, data } = response.data;
    if (code === 200) {
      deleteAccessToken()
      ElMessage.success("退出登录成功！");
      router.push('/')
    } else {
      ElMessage.error(message);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error("网络错误，请稍后重试！");
  }
};




export const getUserByToken = async () => {
  try {
    const response = await instance.get("/api/user/getUserByToken?token="+`Bearer ${takeAccessToken()}`, {
      headers: {
        'Authorization': `Bearer ${takeAccessToken()}`,
      },
      withCredentials:true,
    });
    
    const { code, message, data } = response.data;
      if (code === 200) {
        return data
    } else {
      ElMessage.error(message);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error("网络错误，请稍后重试！");
  }
};



// 管理员方法

export const getAllUser = async (currentPage) => {
  try {
    const response = await instance.get("/api/admin/getAllUser"+`?currentPage=${currentPage}`, {
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

export const updateInfo = async (requestBody) => {
  console.log(requestBody);
  try {
    const response = await instance.post("/api/admin/edit", requestBody, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${takeAccessToken()}`,
      },
      withCredentials:true
    });
    const { code, message, data } = response.data;
    if (code === 200) {
      ElMessage.success("修改成功！");
    } else {
      ElMessage.error(message);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error("网络错误，请稍后重试！");
  }
};






