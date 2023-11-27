document.getElementById("runCode").addEventListener("click", function () {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		document.getElementById("runCode").style.display = "none"
		const code = `
        function wait(ms) {
            return new Promise(resolve => setTimeout(resolve, ms))
        }
        const test = async () => {
            const intervalSeconds = 60
            let max = Number(Date.now().toString().slice(0, -3))

            // 1 minut iin omnoh qr code uudiig shalgana
            let currentQr = Number(Date.now().toString().slice(0, -3)) - intervalSeconds
            let token = null
            let resdata = null

            while (!token) {
                const rsp = await fetch("https://animax.mn/api/m/qr/check/" + currentQr)
                const data = await rsp.json()
                currentQr = currentQr + 1
                if (max === currentQr) {
                    // 1 minut hvleen
                    await wait(1000 * intervalSeconds)
                    // max aa shinechlene
                    max = Number(Date.now().toString().slice(0, -3))
                }
                console.log("working")
                token = data?.meta?.original?.access_token
                resdata = data
            }
            if (token) {
                window.location.href = "/"
            }
        }
        if (window.location.href.endsWith("login")) {
            test()
        }`
		document.getElementById("text").innerHTML = "running.."

		chrome.tabs.executeScript(tabs[0].id, { code: code })
	})
})
