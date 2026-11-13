
(() => {
    const supabase = window.supabaseClient;
    const authLink = document.getElementById("authLink");

    if (!supabase || !authLink) {
        console.error("登入導覽列初始化失敗");
        return;
    }

    function updateAuthLink(session) {
        const isLoggedIn = !!session;

        authLink.textContent = isLoggedIn ? "登出" : "登入";
        authLink.href = isLoggedIn ? "#" : "login.html";
        authLink.dataset.loggedIn = String(isLoggedIn);
    }

    async function checkSession() {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
            console.error("取得登入狀態失敗：", error);
            return;
        }

        updateAuthLink(data.session);
    }

    authLink.addEventListener("click", async (event) => {

        if (authLink.dataset.loggedIn !== "true") {
            return;
        }

        event.preventDefault();

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
