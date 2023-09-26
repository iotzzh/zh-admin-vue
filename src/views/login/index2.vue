<template>
    <div class="login-container">
        <div class="layer">
            <div class="some-space">
                <div class="form">
                    <h2>大数据可视化平台</h2>
                    <div class="item">
                        <i class="iconfont icon-user"></i>
                        <input autocomplete="off" type="text" class="input" v-model="userName" placeholder="请输入用户名" />
                    </div>
                    <div class="item">
                        <i class="iconfont icon-password"></i>
                        <input autocomplete="off" type="password" class="input" v-model="userPwd" maxlength="20"
                            @keyup.enter="login" placeholder="请输入密码" />
                    </div>
                    <button class="loginBtn" :disabled="isLoginAble" @click.stop="login">
                        立即登录
                    </button>
                    <div class="tip">
                        默认用户名：admin ，默认密码：123456
                    </div>
                </div>
            </div>
        </div>
        <Particles id="particles" :options="options" :particlesInit="particlesInit" :particlesLoaded="particlesLoaded">
        </Particles>
    </div>
    <BGAnimation></BGAnimation>
</template>

<script lang="ts" setup>
import { computed, createApp, onMounted, ref } from 'vue';
// import Particles from "vue3-particles";
// import 'vue-particles/dist/style.css';
import { useRouter } from 'vue-router';
import { loadSlim } from "tsparticles-slim";
import BGAnimation from '@/components/datav-components/bgAnimation/index.vue';


const router = useRouter();
const userName = ref('admin');
const userPwd = ref('123456');

const isLoginAble = computed(() => !(userName.value && userPwd.value));

// 注册
const login = async () => {
    if (userName.value === 'admin' && userPwd.value === '123456') router.push({ path: '/root' });
};

const particlesInit = async engine => {
    //await loadFull(engine);
    await loadSlim(engine);
};

const particlesLoaded = async container => {
    console.log("Particles container loaded", container);
};

const options = ref({
    background: {
        color: {
            value: '#021037',
        },
        image: '',
        position: '50% 50%',
        repeat: 'no-repeat',
        size: 'cover',
        opacity: 0.7
    },
    // backgroundMask: {
    //     composite: 'destination-out',
    //     cover: {
    //         color: {
    //             value: '#021037'
    //         },
    //         opacity: 0.5
    //     },
    //     enable: false
    // },
    defaultThemes: {},
    delay: 0,
    fullScreen: {
        enable: true,
        zIndex: 1
    },

    detectRetina: true,
    duration: 0,
    fpsLimit: 120,
    particles: {
        bounce: {
            horizontal: {
                random: {
                    enable: false,
                    minimumValue: 0.1
                },
                value: 1
            },
            vertical: {
                random: {
                    enable: false,
                    minimumValue: 0.1
                },
                value: 1
            }
        },
        collisions: {
            absorb: {
                speed: 2
            },
            bounce: {
                horizontal: {
                    random: {
                        enable: false,
                        minimumValue: 0.1
                    },
                    value: 1
                },
                vertical: {
                    random: {
                        enable: false,
                        minimumValue: 0.1
                    },
                    value: 1
                }
            },
            enable: false,
            maxSpeed: 50,
            mode: 'bounce',
            overlap: {
                enable: true,
                retries: 0
            }
        },

        color: {
            value: '#fffff',
            animation: {
                h: {
                    count: 0,
                    enable: false,
                    offset: 0,
                    speed: 1,
                    delay: 0,
                    decay: 0,
                    sync: true
                },
                s: {
                    count: 0,
                    enable: false,
                    offset: 0,
                    speed: 1,
                    delay: 0,
                    decay: 0,
                    sync: true
                },
                l: {
                    count: 0,
                    enable: false,
                    offset: 0,
                    speed: 1,
                    delay: 0,
                    decay: 0,
                    sync: true
                }
            }
        },
        groups: {},
        move: {
            angle: {
                offset: 0,
                value: 90
            },
            attract: {
                distance: 200,
                enable: false,
                rotate: {
                    x: 600,
                    y: 1200
                }
            },
            center: {
                x: 50,
                y: 50,
                mode: 'percent',
                radius: 0
            },
            decay: 0,
            distance: {},
            direction: 'none',
            drift: 0,
            enable: true,
            gravity: {
                acceleration: 9.81,
                enable: false,
                inverse: false,
                maxSpeed: 50
            },
            path: {
                clamp: true,
                delay: {
                    random: {
                        enable: false,
                        minimumValue: 0
                    },
                    value: 0
                },
                enable: false,
                options: {}
            },
            outModes: {
                default: 'out',
                bottom: 'out',
                left: 'out',
                right: 'out',
                top: 'out'
            },
            random: false,
            size: false,
            speed: 2,
            spin: {
                acceleration: 0,
                enable: false
            },
            straight: false,
            trail: {
                enable: false,
                length: 10,
                fill: {}
            },
            vibrate: false,
            warp: false
        },
        number: {
            density: {
                enable: true,
                width: 1920,
                height: 1080
            },
            limit: 0,
            value: 80
        },
        opacity: {
            random: {
                enable: false,
                minimumValue: 0.1
            },
            value: {
                min: 0.1,
                max: 0.5
            },
            animation: {
                count: 0,
                enable: true,
                speed: 1,
                decay: 0,
                delay: 0,
                sync: false,
                mode: 'auto',
                startValue: 'random',
                destroy: 'none',
                minimumValue: 0.1
            }
        },
        reduceDuplicates: false,
        shadow: {
            blur: 0,
            color: {
                value: '#000'
            },
            enable: false,
            offset: {
                x: 0,
                y: 0
            }
        },
        shape: {
            loadShape: {},
            close: true,
            fill: true,
            options: {
                character: {
                    value: {
                        0: 't',
                        1: 's',
                        2: 'P',
                        3: 'a',
                        4: 'r',
                        5: 't',
                        6: 'i',
                        7: 'c',
                        8: 'l',
                        9: 'e',
                        10: 's'
                    },
                    font: 'Verdana',
                    style: '',
                    weight: 400,
                    fill: true
                },
                char: {
                    value: {
                        0: 't',
                        1: 's',
                        2: 'P',
                        3: 'a',
                        4: 'r',
                        5: 't',
                        6: 'i',
                        7: 'c',
                        8: 'l',
                        9: 'e',
                        10: 's'
                    },
                    font: 'Verdana',
                    style: '',
                    weight: 400,
                    fill: true
                }
            },
            type: 'char'
        },
        size: {
            random: {
                enable: false,
                minimumValue: 1
            },
            value: 16,
            animation: {
                count: 0,
                enable: false,
                speed: 10,
                decay: 0,
                delay: 0,
                sync: false,
                mode: 'auto',
                startValue: 'random',
                destroy: 'none',
                minimumValue: 10
            }
        },
        stroke: {
            width: 1,
            color: {
                value: '#ffffff',
                animation: {
                    h: {
                        count: 0,
                        enable: false,
                        offset: 0,
                        speed: 1,
                        delay: 0,
                        decay: 0,
                        sync: true
                    },
                    s: {
                        count: 0,
                        enable: false,
                        offset: 0,
                        speed: 1,
                        delay: 0,
                        decay: 0,
                        sync: true
                    },
                    l: {
                        count: 0,
                        enable: false,
                        offset: 0,
                        speed: 1,
                        delay: 0,
                        decay: 0,
                        sync: true
                    }
                }
            }
        },
        zIndex: {
            random: {
                enable: false,
                minimumValue: 0
            },
            value: 0,
            opacityRate: 1,
            sizeRate: 1,
            velocityRate: 1
        },
        destroy: {
            bounds: {},
            mode: 'none',
            split: {
                count: 1,
                factor: {
                    random: {
                        enable: false,
                        minimumValue: 0
                    },
                    value: 3
                },
                rate: {
                    random: {
                        enable: false,
                        minimumValue: 0
                    },
                    value: {
                        min: 4,
                        max: 9
                    }
                },
                sizeOffset: true
            }
        },
        roll: {
            darken: {
                enable: false,
                value: 0
            },
            enable: false,
            enlighten: {
                enable: false,
                value: 0
            },
            mode: 'vertical',
            speed: 25
        },
        tilt: {
            random: {
                enable: false,
                minimumValue: 0
            },
            value: 0,
            animation: {
                enable: false,
                speed: 0,
                decay: 0,
                sync: false
            },
            direction: 'clockwise',
            enable: false
        },
        twinkle: {
            lines: {
                enable: false,
                frequency: 0.05,
                opacity: 1
            },
            particles: {
                enable: false,
                frequency: 0.05,
                opacity: 1
            }
        },
        wobble: {
            distance: 5,
            enable: false,
            speed: {
                angle: 50,
                move: 10
            }
        },
        life: {
            count: 0,
            delay: {
                random: {
                    enable: false,
                    minimumValue: 0
                },
                value: 0,
                sync: false
            },
            duration: {
                random: {
                    enable: false,
                    minimumValue: 0.0001
                },
                value: 0,
                sync: false
            }
        },
        rotate: {
            random: {
                enable: false,
                minimumValue: 0
            },
            value: 0,
            animation: {
                enable: false,
                speed: 0,
                decay: 0,
                sync: false
            },
            direction: 'clockwise',
            path: false
        },
        orbit: {
            animation: {
                count: 0,
                enable: false,
                speed: 1,
                decay: 0,
                delay: 0,
                sync: false
            },
            enable: false,
            opacity: 1,
            rotation: {
                random: {
                    enable: false,
                    minimumValue: 0
                },
                value: 45
            },
            width: 1
        },
        links: {
            blink: true,
            color: {
                value: '#ffffff'
            },
            consent: false,
            distance: 150,
            enable: true,
            frequency: 1,
            opacity: 0.4,
            shadow: {
                blur: 5,
                color: {
                    value: '#000'
                },
                enable: false
            },
            triangles: {
                enable: false,
                frequency: 1
            },
            width: 1,
            warp: false
        },
        repulse: {
            random: {
                enable: false,
                minimumValue: 0
            },
            value: 0,
            enabled: false,
            distance: 1,
            duration: 1,
            factor: 1,
            speed: 1
        }
    },

});


</script>  
<style lang="scss" scoped>
.login-container {
    .layer {
        position: absolute;
        height: 100%;
        width: 100%;
    }

    #particles-js {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
    }

    .some-space {
        color: white;
        font-weight: 100;
        letter-spacing: 2px;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1001;
        -webkit-transform: translate3d(-50%, -50%, 0);
        transform: translate3d(-50%, -50%, 0);

        -ms-animation: cloud 2s 3s ease-in infinite alternate;
        -moz-animation: cloud 2s 3s ease-in infinite alternate;
        -webkit-animation: cloud 2s 3s ease-in infinite alternate;
        -o-animation: cloud 2s 3s ease-in infinite alternate;
        -webkit-animation: cloud 2s 3s ease-in infinite alternate;
        animation: cloud 2s 3s ease-in infinite alternate;

        .form {
            width: 460px;
            height: auto;
            background: rgba(36, 36, 85, 0.5);
            margin: 0 auto;
            padding: 35px 30px 25px;
            box-shadow: 0 0 25px rgba(255, 255, 255, 0.5);
            border-radius: 10px;

            .item {
                display: flex;
                align-items: center;
                margin-bottom: 25px;
                border-bottom: 1px solid #d3d7f7;

                i {
                    color: #d3d7f7;
                    margin-right: 10px;
                }
            }

            h2 {
                text-align: center;
                font-weight: normal;
                font-size: 26px;
                color: #d3d7f7;
                padding-bottom: 35px;
            }

            .input {
                font-size: 16px;
                line-height: 30px;
                width: 100%;
                color: #d3d7f7;
                outline: none;
                border: none;
                background-color: rgba(0, 0, 0, 0);
                padding: 10px 0;
            }

            .loginBtn {
                width: 100%;
                padding: 12px 0;
                border: 1px solid #d3d7f7;
                font-size: 16px;
                color: #d3d7f7;
                cursor: pointer;
                background: transparent;
                border-radius: 4px;
                margin-top: 10px;

                &:hover {
                    color: #fff;
                    background: #0090ff;
                    border-color: #0090ff;
                }
            }

            .tip {
                font-size: 12px;
                padding-top: 20px;
            }
        }
    }
}

input::-webkit-input-placeholder {
    color: #d3d7f7;
}

input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #d3d7f7;
}

input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #d3d7f7;
}

input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #d3d7f7;
}

@-ms-keyframes cloud {
    0% {
        -ms-transform: translate(-50%, -50%);
    }

    40% {
        opacity: 1;
    }

    60% {
        opacity: 1;
    }

    100% {
        -ms-transform: translate(-50%, -40%);
    }
}

@-moz-keyframes cloud {
    0% {
        -moz-transform: translate(-50%, -50%);
    }

    40% {
        opacity: 1;
    }

    60% {
        opacity: 1;
    }

    100% {
        -moz-transform: translate(-50%, -40%);
    }
}

@-o-keyframes cloud {
    0% {
        -o-transform: translate(-50%, -50%);
    }

    40% {
        opacity: 1;
    }

    60% {
        opacity: 1;
    }

    100% {
        -o-transform: translate(-50%, -40%);
    }
}

@-webkit-keyframes cloud {
    0% {
        -webkit-transform: translate(-50%, -50%);
    }

    40% {
        opacity: 1;
    }

    60% {
        opacity: 1;
    }

    100% {
        -webkit-transform: translate(-50%, -40%);
    }
}

@keyframes cloud {
    0% {
        transform: translate(-50%, -50%);
    }

    40% {
        opacity: 1;
    }

    60% {
        opacity: 1;
    }

    100% {
        transform: translate(-50%, -40%);
    }
}
</style>
  