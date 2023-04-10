const fs = require('node:fs/promises')

//删除文件
const deleteFile = async (filePath) => {
    try {
        if (await fs.stat(filePath)) {
            //判断给定的路径是否存在
            await fs.unlink(filePath) //是指定文件，则删除
            console.log('删除成功！')
        }
    } catch (e) {
        console.log('删除失败！')
    }
}

module.exports = {
    deleteFile,
}
