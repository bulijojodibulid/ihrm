export function fileReader (file) {
    if(!file){
        return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
        console.log(e.target.result)
    }
    reader.readAsArrayBuffer(file)
}