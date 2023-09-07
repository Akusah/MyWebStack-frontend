import axios from "axios";
import { ElMessage } from "element-plus";
import router from "@/router";

const authItemName = "access_token";

//取出token
export const takeAccessToken = () => {
  const str = localStorage.getItem(authItemName);
  if (!str) return null;
  const authObj = JSON.parse(str);
  if (authObj.expire <= new Date()) {
    deleteAccessToken();
    ElMessage.warning("登录状态已过期，请重新登录");
    return null;
  }
  return authObj.token;
};

const deleteAccessToken = () => {
  localStorage.removeItem(authItemName);
};

const instance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 3000,
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

export const getWebList = async () => {
  try {
    const response = await instance.get("sys/category/getCategoryList", {
      headers: {
        'Authorization': `Bearer ${takeAccessToken()}`,
      },
      withCredentials: true,
    });
    const { code, message, data } = response.data;
    if (code === 200) {
      return data;
    } else {
      ElMessage.error(message);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error("获取失败！");
  }
};

export const getWebListUnderCategory = async () => {
  try {
    const response = await instance.get(
      "sys/category/getWebListUnderCategory",
      {
        headers: {
          'Authorization': `Bearer ${takeAccessToken()}`,
        },
        withCredentials: true,
      }
    );
    console.log(response.data);
    const { code, message, data } = response.data;
    if (code === 200) {
      return data;
    } else {
      ElMessage.error(message);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error("获取失败！");
  }
};

export const addPageview = async (webId) => {
  try {
    const response = await instance.post("sys/webinfo/addCount/"+ webId,{}, {
      headers: {
          'Authorization': `Bearer ${takeAccessToken()}`,
      },
      withCredentials:true
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
    ElMessage.error("网络错误，请稍后重试！");
  }
};




export const getWebById = async (webId) => {
  try {
    const response = await instance.get("sys/web/getWebById/" + webId, {
      headers: {
        Authorization: `Bearer ${takeAccessToken()}`,
      },
      withCredentials: true,
    });
    const { code, message, data } = response.data;
    if (code === 200) {
      return data;
    } else {
      ElMessage.error(message);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error("获取失败！");
  }
};

// 管理员方法

export const getWebInfo = async (num) => {
  try {
    const response = await instance.get("/api/admin/getWebInfo?num="+num, {
      headers: {
          'Authorization': `Bearer ${takeAccessToken()}`,
      },
      withCredentials:true
    });
    const { code, message, data } = response.data;
    if (code === 200) {
      console.log(data);
      return data
    } else {
      ElMessage.error(message);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error("获取失败！");
  }
};


export const getAllWeb = async (currentPage) => {
  try {
    const response = await instance.get("/api/admin/getWebsByPage"+`?currentPage=${currentPage}`, {
      headers: {
        'Authorization': `Bearer ${takeAccessToken()}`,
      },
      withCredentials:true
    });
    const { code, message, data } = response.data;
    if (code === 200) {
      console.log(data);
      return data;
    } else {
      ElMessage.error(message);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error("网络错误，请稍后重试！");
  }
};



export const getMainCategory = async () => {
  try {
    const response = await instance.get("sys/category/getCategoryList", {
      headers: {
        Authorization: `Bearer ${takeAccessToken()}`,
      },
      withCredentials: true,
    });
    const { code, message, data } = response.data;
    if (code === 200) {
      return data;
    } else {
      ElMessage.error(message);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error("获取失败！");
  }
};


export const updateWebInfo = async (requestBody) => {
  console.log(requestBody);
  try {
    const response = await instance.post("/api/admin/editWeb", requestBody, {
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


export const addCategory = async (requestBody) => {
  console.log(requestBody);
  try {
    const response = await instance.post("/api/admin/addCategory", requestBody, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${takeAccessToken()}`,
      },
      withCredentials:true
    });
    const { code, message, data } = response.data;
    if (code === 200) {
      ElMessage.success("添加成功！");
    } else {
      ElMessage.error(message);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error("网络错误，请稍后重试！");
  }
};


export const deleteCategory = async (requestBody) => {
  try {
    const response = await instance.post("/api/admin/deleteCategory", requestBody, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${takeAccessToken()}`,
      },
      withCredentials:true
    });
    const { code, message, data } = response.data;
    if (code === 200) {
      ElMessage.success("删除成功！");
    } else {
      ElMessage.error(message);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error("网络错误，请稍后重试！");
  }
};


export const addWeb = async (requestBody) => {
  console.log(requestBody);
  try {
    const response = await instance.post("/api/admin/addWeb", requestBody, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${takeAccessToken()}`,
      },
      withCredentials:true
    });
    const { code, message, data } = response.data;
    if (code === 200) {
      ElMessage.success("添加成功！");
    } else {
      ElMessage.error(message);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error("网络错误，请稍后重试！");
  }
};


export const uploadFile = async (requestBody) => {
  try {
    const response = await instance.post("/api/admin/uploadFile", requestBody, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${takeAccessToken()}`,
      },
      withCredentials:true
    });
    const { code, message, data } = response.data;
    if (code === 200) {
      ElMessage.success("上传成功！");
    } else {
      ElMessage.error(message);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error("网络错误，请稍后重试！");
  }
};
