var hoverZoomPlugins = hoverZoomPlugins || [];
hoverZoomPlugins.push({
    name:'lacroix',
    version:'0.1',
    prepareImgLinks:function (callback) {
        var res = [];

        // sample: https://i.la-croix.com/86x86/smart/2023/09/25/1201284180/Jean-Christophe-Ploquin_0.jpg
        //      -> https://i.la-croix.com/x/smart/2023/09/25/1201284180/Jean-Christophe-Ploquin_0.jpg

        const reFind = /(.*\.la-croix\.com)\/\d+x\d+\/(.*)/;
        const reReplace = '$1/x/$2';

        function findFullsizeUrl(link, src) {
            let fullsizeUrl = src.replace(reFind, reReplace);
            if (fullsizeUrl == src) return;

            if (link.data().hoverZoomSrc == undefined) { link.data().hoverZoomSrc = [] }
            if (link.data().hoverZoomSrc.indexOf(fullsizeUrl) == -1) {
                link.data().hoverZoomSrc.unshift(fullsizeUrl);
                res.push(link);
            }
        }

        $('img[src]').each(function() {
            findFullsizeUrl($(this), this.src);
        });

        $('[style*=url]').each(function() {
            // extract url from style
            var backgroundImage = this.style.backgroundImage;
            const reUrl = /.*url\s*\(\s*(.*)\s*\).*/i
            backgroundImage = backgroundImage.replace(reUrl, '$1');
            // remove leading & trailing quotes
            var backgroundImageUrl = backgroundImage.replace(/^['"]/, '').replace(/['"]+$/, '');
            findFullsizeUrl($(this), backgroundImageUrl);
        });

        if (res.length) {
            callback($(res), this.name);
        }
    }
});
