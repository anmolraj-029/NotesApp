/**Get Homepage */
exports.homepage=async(req,res)=>{
    const locals={
        title:'Node js Notes',
        description:'Free Nodejs Notes App.',
    };
    res.render('index',{
        locals,
        layout:'../views/layouts/front-page'
    });
}
/*Get About*/
exports.about=async(req,res)=>{
    const locals={
        title:'About-Nodejs Notes',
        description:'Free Nodejs Notes App',
    }
    res.render('about',locals);
}