$(document).ready(function () {
    let shortlyAPI = "https://api.shrtco.de/v2/shorten?url=example.org/very/long/link.html"
    
    let myInterval;
    const linkInput = document.querySelector(".link-input")
    $(".button").click(function(){
        $.ajax({
            type: "GET",
            url: shortlyAPI,
            success: function (response) {
            console.log(response)
            if (linkInput.checkValidity() && $(".link-input").val() != ""){
                var link = document.createElement("div")
            link.classList.add("link")
            var originLink = document.createElement("span")
            originLink.textContent = $(".link-input").val()
            originLink.classList.add("original-link")
            var rightSide = document.createElement("div")
            rightSide.classList.add("rightSide")
            var shorted = document.createElement("span")
            shorted.textContent = `${response.result.short_link}`
            shorted.classList.add("shorted")
            var copyBtn = document.createElement("button")
            copyBtn.addEventListener("click",function(){
                let text = shorted.textContent;
                navigator.clipboard.writeText(text);
                console.log(text);
                copyBtn.textContent = "Copied!";
                copyBtn.style.backgroundColor = "hsl(257, 27%, 26%)";
                clearInterval(myInterval)
                myInterval = setInterval(function(){
                    copyBtn.textContent = "Copy";
                    copyBtn.style.backgroundColor = "hsl(180, 66%, 49%)";
                },2000);
            })
            copyBtn.classList.add("copy")
            copyBtn.textContent = "Copy"
            link.appendChild(originLink)
            link.appendChild(rightSide)
            rightSide.appendChild(shorted)
            rightSide.appendChild(copyBtn)
            $(".link-row").append(link)

            $(".error").css("display","none")
            linkInput.style.border = "none"
            }else{
                $(".error").css("display","block")
                linkInput.style.border = "2px solid hsl(0, 87%, 67%)"
            }
         }
        });
    })

    $(".hamburger").click(function(){
        $(".mobile-nav").toggleClass("active")
    })
});

$(".bi-x-lg").click(function(){
    $(".me").addClass("hidden");
})