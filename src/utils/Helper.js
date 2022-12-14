import imageCompression from 'browser-image-compression';
const Helper = {}

Helper.compressImage = async function(imageFile) {
    const options = {
        maxSizeMB: .25,
        maxWidthOrHeight: 1920,
        useWebWorker: true
    }
    try {
        const compressedFile = await imageCompression(imageFile, options);
        var file = Helper.buildFile(compressedFile, compressedFile.name, compressedFile.type);
        return file;
    } catch (error) {
        console.log(error);
    }
    return;
};

Helper.buildFile = function(blob, name, type) {
    return new File([blob], name, { type: type });
};

Helper.formatPrice = function(price) {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    })
    return formatter.format(price)
};

Helper.formatDate = function(input) {
    var datePart = input.match(/\d+/g),
        year = datePart[0], // get only two digits
        month = datePart[1],
        day = datePart[2];
    return day + '-' + month + '-' + year;
}

Helper.timestampToDate = function(timestamp) {
    const date = new Date( timestamp );
    const day = (date.getDate() < 10 ? '0' : '') + date.getDate();
    const month = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    const year = date.getFullYear()
    return year+"-"+month+"-"+day
},

Helper.toCapitalize = function(string) {
    return string.replace(/^\w/, (c) => c.toUpperCase());
}

Helper.customPagination = function(data) {
    return {
        totalPage: data.total_num_page,
        length: data.total_items,
        page: data.page,
        size: data.limit
    }
}

Helper.formatPhoneNumber = function(phone){
    return phone.replace(/[() -]/g,'');
}

export default Helper;