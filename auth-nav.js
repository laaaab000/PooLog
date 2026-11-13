
(() => {
    const supabase = window.supabaseClient;
    const authLink = document.getElementById("authLink");

    // 確認設定是否正確
    if (!supabase) {
        console.error("找不到 Supabase 設定");
        return;
    }

    if (!authLink) {
        console.error("找不到登入按鈕 authLink");
        return;
    }

    // 更新導覽列登入狀態
    function updateAuthLink(session) {
        const isLoggedIn = !!session;

        if (isLoggedIn) {
            authLink.textContent = "登出";
            authLink.href = "#";
            authLink.dataset.loggedIn = "true";
        } else {
            authLink.textContent = "登入";
            authLink.href = "login.html";
            authLink.dataset.loggedIn = "false";
        }
    }

    // 頁面載入時取得登入狀態
    async function checkLoginStatus() {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
            console.error("取得登入狀態失敗：", error.message);
            return;
        }

        updateAuthLink(data.session);
    }

    // 點擊登出
    authLink.addEventListener("click", async (event) => {
        if (authLink.dataset.loggedIn !== "true") {
            return;
        }

        event.preventDefault();

        const { error } = await supabase.auth.signOut();

        if (error) {
            alert("登出失敗：" + error.message);
            console.error(error);
            return;
        }

        window.location.href = "index.html";
    });

    // 監聽登入狀態變化
    supabase.auth.onAuthStateChange((event, session) => {
        updateAuthLink(session);
    });

    // 初始化登入狀態
    checkLoginStatus();

})();

        event.preventDefault();

        const { error } = await supabase.auth.signOut();

        if (error) {
            alert("登出失敗：" + error.message);
            return;
        }

        window.location.href = "index.html";
    });
}

// 監聽登入狀態變化
if (supabase) {
    supabase.auth.onAuthStateChange((event, session) => {
        if (authLink) {
            const isLoggedIn = !!session;

            authLink.textContent = isLoggedIn ? "登出" : "登入";
            authLink.href = isLoggedIn ? "#" : "login.html";
            authLink.dataset.loggedIn = isLoggedIn ? "true" : "false";
        }
    });

    // 頁面載入時檢查登入狀態
    updateAuthLink();
}
    });

    // 監聽登入狀態變化
    supabase.auth.onAuthStateChange(() => {
        updateAuthLink();
    });

    await updateAuthLink();
});
