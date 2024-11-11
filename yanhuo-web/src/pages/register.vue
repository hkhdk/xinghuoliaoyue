<template>
    <div class="reds-modal login-modal" role="presentation">
        <i tabindex="-1" class="reds-mask" aria-label="弹窗遮罩"></i><!---->
        <div class="login-container">
            <div class="icon-btn-wrapper close-button" @click="close">
                <Close style="width: 1em; height: 1em" />
            </div>
            <div class="left">
                <img class="logo" src="@/assets/xhly-icon.jpg" />
                <div class="course-video" style="display: none">
                    <!-- <video src="https://fe-video-qc.xhscdn.com/fe-platform/f3ddbc4d8062e08c8684e1fa3bea7c2e2bb77c21.mp4"
                        preload="auto"></video> -->
                </div>
                <div class="qrcode">

                <img
                    class="qrcode-img"
                    src="@/assets/key.jpg"
                    alt="扫码"
                />
                    <div class="status" style="display: none"></div>
                </div>
                <div class="tip">欢迎加入粉丝群反馈</div>
                <div class="course">
                    <svg class="reds-icon play" width="11" height="11">
                        <use xlink:href="#play"></use>
                    </svg>
                    <!-- 教程 -->
                </div>
            </div>
            <div class="right">
                <div class="title">注册</div>
                <!---->
                <div class="input-container">
                    <form onsubmit="return false">
                        <label class="phone">
                            <span class="country-code"></span>
                            <input placeholder="输入手机号" type="text" name="blur" v-model="userLogin.username" /><svg
                                class="reds-icon clear" width="24" height="24" fill="#xhs-pc-web-phone"
                                style="display: none">
                                <use xlink:href="#clear"></use>
                            </svg></label>
                        <div style="height: 16px"></div>
                        <label class="auth-code"><input type="password" placeholder="输入密码" autocomplete="false"
                                v-model="userLogin.password" /></label>
                        <label class="auth-code"><input type="password" placeholder="再次输入密码" autocomplete="false"
                                v-model="userLogin.checkPassword" /></label>
<!--                        <label class="auth-code"><input type="text" placeholder="输入验证码" autocomplete="false"-->
<!--                                v-model="userLogin.code" /></label>-->
                        <!-- <label class="phone"
                >
                <span class="country-code">+86</span>
                <input
                  placeholder="输入手机号"
                  type="text"
                  name="blur"
                  v-model="userLogin.phone" /><svg
                  class="reds-icon clear"
                  width="24"
                  height="24"
                  fill="#xhs-pc-web-phone"
                  style="display: none"
                >
                  <use xlink:href="#clear"></use></svg
              ></label>
              <div style="height: 16px"></div>
              <label class="auth-code"
                ><input
                  type="number"
                  placeholder="输入验证码"
                  autocomplete="false"
                  v-model="userLogin.code"
                /><span class="code-button">获取验证码</span></label
              > -->
                      <div style="height: 16px" >*若提示失败，说明手机号已经注册</div>
                        <div class="err-msg"></div>
                        <button class="submit" @click="loginMethod">注册</button>
                    </form>
                </div>
                <!-- <div class="agreements">
            <span class="agree-icon"></span>
            <label> 
              我已阅读并同意
            </label><a class="links" target="_blank"
              href="https://agree.xiaohongshu.com/h5/terms/ZXXY20220331001/-1">
              《用户协议》
            </a><a class="links" target="_blank"
              href="https://agree.xiaohongshu.com/h5/terms/ZXXY20220509001/-1">
              《隐私政策》
            </a><br /><a class="links"
              target="_blank" href="https://oa.xiaohongshu.com/h5/terms/ZXXY20220516001/-1"
              style="margin-left: 25px">
              《儿童/青少年个人信息保护规则》
            </a>
          </div> -->
                <div class="oauth-tip"><span class="oauth-tip-line">
                        <!-- 或 -->

                    </span></div>
                <div class="login">
                    <!-- <div class="login-common wechat">
              <svg class="reds-icon" width="18" height="18" style="margin-right: 4px">
                <use xlink:href="#wechat"></use>
              </svg> 
              微信登录
            </div> -->
                    <!-- <div class="login-common reg">新用户注册</div> -->
                </div>
            </div>
        </div>
        <!---->
        <div class="reds-alert">
            <div class="reds-alert-mask" style="display: none"></div>
            <div class="reds-alert-wrapper slot-content" style="width: 320px; display: none">
                <!----><!---->
                <div class="reds-alert-title">
                    <!-- 阅读并同意 -->
                </div>
                <div class="reds-alert-content">
                    <!----><!----><label data-v-44ecdae0-s="" class="alert-content">
                        <div data-v-44ecdae0-s="" class="alert-text">
                            <a data-v-44ecdae0-s="" target="_blank"
                                href="https://agree.xiaohongshu.com/h5/terms/ZXXY20220331001/-1">
                                <!-- 《用户协议》 -->
                            </a><a data-v-44ecdae0-s="" target="_blank"
                                href="https://agree.xiaohongshu.com/h5/terms/ZXXY20220509001/-1">
                                <!-- 《隐私政策》 -->
                            </a><br data-v-44ecdae0-s="" /><a data-v-44ecdae0-s="" target="_blank"
                                href="https://oa.xiaohongshu.com/h5/terms/ZXXY20220516001/-1">
                                <!-- 《儿童/青少年个人信息保护规则》 -->
                            </a>
                        </div>
                    </label>
                </div>
                <div class="reds-alert-footer">
                    <div class="foot-btns">
                        <div class="foot-btn">同意并继续</div>
                        <div class="foot-btn">取消</div>
                    </div>
                    <!----><!---->
                </div>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { Close } from "@element-plus/icons-vue";
import type { UserLogin } from "@/type/user";
import { register } from "@/api/user";
import { ref } from "vue";
import { storage } from "@/utils/storage";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const userStore = useUserStore();
const router = useRouter();

const userLogin = ref<UserLogin>({
    username: "",
    password: "",
    checkPassword: "",
});

const emit = defineEmits(["clickChild"]);
const close = () => {
    //传递给父组件
    emit("clickChild", false);
};

const validateLoginForm = () => {
    const { username, password, checkPassword } = userLogin.value;

    // 检查用户名是否为空
    if (!username) {
        ElMessage.error('用户名不能为空');
        return false; // 停止进一步的检查
    }

    // 检查用户名长度
    if (username.length < 11) {
        ElMessage.error('手机号错误，请重新检查！');
        return false; // 停止进一步的检查
    }

    // 检查密码是否为空
    if (!password) {
        ElMessage.error('密码不能为空');
        return false; // 停止进一步的检查
    }

    // 检查密码长度
    if (password.length < 6) {
        ElMessage.error('密码长度不能小于6个字符');
        return false; // 停止进一步的检查
    }

    // 检查确认密码是否为空
    if (!checkPassword) {
        ElMessage.error('确认密码不能为空');
        return false; // 停止进一步的检查
    }

    // 检查两次输入的密码是否一致
    if (password !== checkPassword) {
        ElMessage.error('两次输入的密码不一致');
        return false; // 停止进一步的检查
    }

    // 所有验证通过
    return true;
};

const loginMethod = () => {
    if(!validateLoginForm()) return
    register(userLogin.value)
        .then((res: any) => {
            const { data } = res;
            const currentUser = data.userInfo;
            storage.set("accessToken", data.accessToken);
            storage.set("refreshToken", data.refreshToken);
            userStore.setUserInfo(currentUser);
            router.push({ path: "/", query: { date: Date.now() } });
            emit("clickChild", false, true);
            ElMessage.success("注册成功");
        })
        .catch((error: any) => {
            console.log(error);
        });
    // loginByCode(userLogin.value).then((res: any) => {
    //   const { data } = res;
    //   const currentUser = data.userInfo;
    //   storage.set("accessToken", data.accessToken);
    //   storage.set("refreshToken", data.refreshToken);
    //   userStore.setUserInfo(currentUser);
    //   router.push({ path: "/", query: { date: Date.now() } });
    //   emit("clickChild", false);
    // });
};
</script>
  
<style lang="less" scoped>
a {
    text-decoration: none;
    background-color: transparent;
}

.login-modal {
    z-index: 1000;
    flex-direction: column;
}

.reds-modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    box-sizing: border-box;
    visibility: visible;
    opacity: 1;
    transition:
        opacity 0.2s,
        visibility 0.2s;

    .reds-mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.25);
        z-index: -1;
    }

    .login-container {
        display: flex;
        position: relative;
        width: 800px;
        height: 480px;
        background: #fff;
        border-radius: 16px;
        box-shadow:
            0 4px 32px 0 rgba(0, 0, 0, 0.08),
            0 1px 4px 0 rgba(0, 0, 0, 0.04);
        transition: all 0.2s;

        .close-button {
            position: absolute;
            right: 20px;
            top: 20px;
            cursor: pointer;
            color: rgba(51, 51, 51, 0.8);
        }

        .left {
            width: 400px;
            display: flex;
            align-items: center;
            flex-direction: column;
            border-right: 1px solid rgba(0, 0, 0, 0.08);

            img {
                border-style: none;
            }

            .logo {
                margin-top: 64px;
                width: 91.08px;
                height: 48px;
                -webkit-user-select: none;
                user-select: none;
                pointer-events: none;
            }

            .course-video {
                margin-top: 20px;
                width: 160px;
                height: 240px;
                overflow: hidden;
                margin-bottom: -1px;

                video {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            .qrcode {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 32px;
                width: 192px;
                height: 192px;
                border: 2px solid var(--color-shadow-border);
                border-radius: 12px;
                background: var(--color-white);

                .qrcode-img {
                    width: 160px;
                    height: 160px;
                }

                .status {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    flex-direction: column;
                    background: #fff;
                    opacity: 0.95;
                    -webkit-backdrop-filter: blur(2.5px);
                    backdrop-filter: blur(2.5px);
                    border-radius: 10px;
                }
            }

            .tip {
                color: #333;
                font-weight: 600;
                font-size: 12px;
                margin-top: 16px;
                line-height: 120%;
            }

            .course {
                width: 64px;
                height: 28px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 999px;
                margin-top: 43.5px;
                font-weight: 400;
                font-size: 14px;
                color: rgba(51, 51, 51, 0.8);
                cursor: pointer;
            }
        }

        .right {
            width: 400px;
            display: flex;
            align-items: center;
            flex-direction: column;
            margin-top: 48px;

            .title {
                font-size: 18px;
                color: rgba(51, 51, 51, 0.8);
                font-weight: 600;
                line-height: 120%;
            }

            .input-container {
                margin-top: 24px;
                width: 304px;
                display: flex;
                flex-direction: column;

                .auth-code {
                    justify-content: center;
                }

                .auth-code,
                .phone {
                    display: flex;
                    align-items: center;
                    font-size: 16px;
                    line-height: 22px;
                    color: rgba(51, 51, 51, 0.8);
                    height: 48px;
                    background: #fff;
                    border-radius: 999px;
                    transition: border-color 0.2s;
                    border-bottom: 0.5px solid rgba(0, 0, 0, 0.08);

                    .country-code {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: relative;
                        width: 29px;
                        height: 100%;
                        font-weight: 400;
                        margin-left: 16px;
                        margin-right: 20px;
                        color: #333;
                    }

                    .country-code:after {
                        position: absolute;
                        left: 41px;
                        content: "";
                        height: 24px;
                        width: 1px;
                        background-color: #fff;
                    }
                }

                .auth-code input,
                .phone input {
                    font-size: 16px;
                    //width: 130px;
                    height: 100%;
                    caret-color: #ff2442;
                    color: #333;
                }

                .code-button {
                    font-size: 16px;
                    color: #ff2442;
                    cursor: pointer;
                    opacity: 0.5;
                }

                .err-msg {
                    margin-top: 9.5px;
                    height: 10px;
                    line-height: 10px;
                    color: var(--color-red);
                    font-size: 14px;
                    font-weight: 400;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .submit {
                    margin-top: 24px;
                    height: 48px;
                    background: #ff2442;
                    color: #fff;
                    opacity: 0.5;
                    border-radius: 999px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    width: 100%;
                }

                form {
                    display: block;
                    margin-top: 0em;
                }
            }

            .agreements {
                width: 280px;
                position: relative;
                margin-top: 16px;
                padding-left: 18px;
                font-size: 12px;
                color: var(--color-tertiary-label);
                line-height: 120%;

                .agree-icon {
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    border-radius: 100%;
                    background-color: #fff;
                    border: 1px solid rgba(0, 0, 0, 0.183);
                }

                a {
                    color: #13386c;
                }

                .links {
                    font-weight: 400;
                }
            }

            .oauth-tip:after,
            .oauth-tip:before {
                display: block;
                width: 133px;
                height: 1px;
                content: "";
                background-color: rgba(0, 0, 0, 0.08);
            }

            .oauth-tip-line {
                margin: 0 12px;
            }

            .oauth-tip {
                margin-top: 29px;
                display: flex;
                align-items: center;
                font-weight: 400;
                font-size: 14px;
                color: rgba(51, 51, 51, 0.6);
            }

            .login {
                display: flex;
                margin-top: 16px;

                .login-common {
                    width: 144px;
                    height: 40px;
                    border: 1px solid rgba(0, 0, 0, 0.08);
                    border-radius: 999px;
                    color: rgba(51, 51, 51, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    margin-right: 10px;

                    .reg {
                        margin-left: 16px;
                    }
                }
            }
        }
    }
}
</style>
  