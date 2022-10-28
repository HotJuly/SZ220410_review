const fs = require('fs');
/*
    为什么当前以下代码,会出现有时是12,有时是21的情况
        setTimeout函数接收两个参数
            1.延迟一段时间之后执行的回调函数
            2.延迟时间(单位:ms)
                延迟时间最小值是1,即便我们写0,代表的也是1

        原因:由于主线程代码太少了,执行时间都不到1ms,结果进入timer阶段,
            发现定时器不满足执行条件,js就会前往下一个阶段继续轮询


*/

// setTimeout(()=>{
//     console.log(1);
// },0);

// // 读取文件需要开启通道才能读取,光开启通道就要花费超过100ms的时间
// fs.readFile('./01.原型.html',()=>{
//     console.log(2)

//     setTimeout(()=>{
//         console.log(3);
//     },0);

//     setImmediate(()=>{
//         console.log(4);
//     })
    
// })

// setImmediate(()=>{
//     console.log(5);
// })

// for (let index = 0; index < 100000; index++) {
    
// }


/*
    node中,.then会开启微任务,相当于是VIP级别的
            而nextTick也会开启微任务,相当于是SVIP级别的

    node中微任务队列有2个,一个是.then的,一个是nextTick的


*/
// Promise.resolve().then(()=>{
//     console.log(1)
    
//     Promise.resolve().then(()=>{
//         console.log(2)
//     })
    
//     process.nextTick(()=>{
//         console.log(3)
//     })

//     Promise.resolve().then(()=>{
//         console.log(4)
//     })
// })


process.nextTick(()=>{
    console.log(1)
    
    Promise.resolve().then(()=>{
        console.log(2)
    })
    
    process.nextTick(()=>{
        console.log(3)
    })

    Promise.resolve().then(()=>{
        console.log(4)
    })
})