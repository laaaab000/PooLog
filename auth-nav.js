
document.addEventListener("DOMContentLoaded", async () => {
    const authLink = document.getElementById("authLink");
    const supabase = window.supabaseClient;

    if (!authLink || !supabase) return;

    // 更新登入狀態
    async function updateAuthLink() {
        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
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
    authLink.addEventListener("click", async (event) => {
        if (authLink.dataset.loggedIn === "true") {
            event.preventDefault();

            const { error } = await supabase.auth.signOut();

            if (error) {
                alert("登出失敗：" + error.message);
                return;
            }

            window.location.href = "index.html";
        }
    });

    // 監聽登入狀態變化
    supabase.auth.onAuthStateChange(() => {
        updateAuthLink();
    });

    await updateAuthLink();
});
