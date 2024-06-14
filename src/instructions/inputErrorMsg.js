export default {
    update (el, binding) {
        const value = binding.value
        const errMsgElem = el.nextElementSibling
        
        if (!(value === 'ok')){
            errMsgElem.style.transform = `translateY(21px)`
            errMsgElem.style.opacity = 1
            errMsgElem.innerText = value
        }else{
            errMsgElem.style.transform = 'translateY(0px)'
            errMsgElem.style.opacity = 0
        }
    }
}