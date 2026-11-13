
(() => {

    const supabase = window.supabaseClient;
    const authLink = document.getElementById("authLink");

    const RETURN_KEY = "poologReturnTo";

    if (!supabase || !authLink) {
        console.error("登入導覽列初始化失敗", {
            hasSupabase: !!supabase,
            hasAuthLink: !!authLink
        });
        return;
    }

    // 更新導覽列登入狀態
    function updateAuthLink(session) {

        const isLoggedIn = !!session;

        authLink.textContent = isLoggedIn ? "登出" : "登入";

        authLink.href = isLoggedIn ? "#" : "login.html";

        authLink.dataset.loggedIn = String(isLoggedIn);
    }

    // 檢查目前登入狀態
    async function checkSession() {

        const { data, error } = await supabase.auth.getSession();

        if (error) {
            console.error("取得登入狀態失敗：", error);
            return;
        }

        updateAuthLink(data.session);
    }

    // 點擊登入或登出
    authLink.addEventListener("click", async (event) => {

        const isLoggedIn =
            authLink.dataset.loggedIn === "true";

        // 尚未登入：記錄目前頁面，前往登入頁
        if (!isLoggedIn) {

            const currentPage =
                window.location.pathname +
                window.location.search +
                window.location.hash;

            // 避免將登入頁本身記錄成返回頁面
            if (!window.location.pathname.endsWith("/login.html")) {
                sessionStorage.setItem(RETURN_KEY, currentPage);
            }

            return;
        }

        // 已登入：執行登出
        event.preventDefault();

        authLink.textContent = "登出中...";
        authLink.style.pointerEvents = "none";

        try {

            const { error } = await supabase.auth.signOut();

            if (error) {
                throw error;
            }

            // Supabase 已清除目前的登入 Session
            sessionStorage.removeItem(RETURN_KEY);

            // 返回首頁
            window.location.replace("index.html");

        } catch (error) {

            console.error("登出失敗：", error);

            alert("登出失敗：" + error.message);

            await checkSession();

        } finally {

            authLink.style.pointerEvents = "";

        }

    });

    // 監聽登入及登出狀態
    supabase.auth.onAuthStateChange((_event, session) => {

        updateAuthLink(session);

    });

    // 頁面載入時檢查登入狀態
    checkSession();

})();

        authLink.textContent = "登出中...";

        const { error } = await supabase.auth.signOut();

        if (error) {
            alert("登出失敗：" + error.message);
            await checkSession();
            return;
        }

        window.location.href = "index.html";
    });

    supabase.auth.onAuthStateChange((_event, session) => {
        updateAuthLink(session);
    });

    checkSession();

})();
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("登出失敗：", error);
            alert("登出失敗：" + error.message);
            await checkSession();
            return;
        }

        window.location.href = "index.html";
    });

    supabase.auth.onAuthStateChange((event, session) => {
        updateAuthLink(session);
    });

    checkSession();
})();
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
