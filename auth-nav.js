
const supabase = window.supabaseClient;
const authLink = document.getElementById("authLink");

async function updateAuthLink() {
    if (!authLink || !supabase) {
        console.error("找不到登入按鈕或 Supabase 設定");
        return;
    }

    const { data, error } = await supabase.auth.getSession();

    if (error) {
        console.error("取得登入狀態失敗：", error.message);
        return;
    }

    const isLoggedIn = !!data.session;

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

// 點擊登入／登出
if (authLink) {
    authLink.addEventListener("click", async (event) => {
        if (authLink.dataset.loggedIn !== "true") {
            return;
        }

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
