/**
 * 消息提示
 */
function message (msg) {
    // 创建一个div容器
    const div = document.createElement('div')

    // 设置样式
    div.classList.add('message')

    // 设置文本内容
    div.innerText = msg

    // 设置动画
    const ani = div.animate([
        {
            opacity: 0,
            transform: 'translate(-100px, -100px)'
        },
        {
            opacity: 1,
            transform: 'translate(-100px, -30px)'
        }
    ],{
        duration: 300
    })

    // 动画结束后，删除元素
    setTimeout(() => {
        ani.reverse()
        ani.play()
        ani.onfinish = () => {
            div.remove()
        } 
    }, 1000)

    document.body.appendChild(div)
}

export default message