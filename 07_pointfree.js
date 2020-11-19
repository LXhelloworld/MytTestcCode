//把一个字符串中的首字母转换成大写，并用。 作为分隔符
//world wild web => W. W. W

const fp = require('lodash/fp')

const toUpperFirstLetter = fp.flowRight(fp.join('. '), fp.map(fp.flowRight(fp.first, fp.toUpper)), fp.split(' '))


console.log(toUpperFirstLetter('world wild web'))