'use client';

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {login, logout, register} from "@/services/auth.service";
import {useAuthStore} from "@/stores/auth.store";
import {useRouter} from "next/navigation";
import {useState} from "react";

export function LoginForm({
                              className,
                              ...props
                          }: React.ComponentProps<"div">) {
    const router = useRouter();
    const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
    const doLogout = useAuthStore((state) => state.logout);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await login({email, password});
            if (res?.userId) {
                setAuthenticated(true, res.userId);
                localStorage.setItem("sessionId", res.userId);
                router.push("/dashboard/dials"); // redirect after login
            }
        } catch (err) {
            console.error("Login failed", err);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await register({email, password});
            if (res?.userId) {
                setAuthenticated(true, res.userId);
                localStorage.setItem("sessionId", res.userId);

                router.push("/dashboard/dials"); // redirect after register
            }
        } catch (err) {
            console.error("Registration error:", err);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem("sessionId");

        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            doLogout();
            router.push("/login");
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>{isRegistering ? "Create an account" : "Login to your account"}</CardTitle>
                    <CardDescription>
                        {isRegistering
                            ? "Fill the form to register a new account"
                            : "Enter your email below to login to your account"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={isRegistering ? handleRegister : handleLogin}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    {!isRegistering && (
                                        <a
                                            href="#"
                                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                        >
                                            Forgot your password?
                                        </a>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full">
                                    {isRegistering ? "Sign up" : "Login"}
                                </Button>
                                {!isRegistering && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Button>
                                )}
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            {isRegistering ? (
                                <>
                                    Already have an account?{" "}
                                    <button
                                        type="button"
                                        className="underline underline-offset-4"
                                        onClick={() => setIsRegistering(false)}
                                    >
                                        Login
                                    </button>
                                </>
                            ) : (
                                <>
                                    Don&apos;t have an account?{" "}
                                    <button
                                        type="button"
                                        className="underline underline-offset-4"
                                        onClick={() => setIsRegistering(true)}
                                    >
                                        Sign up
                                    </button>
                                </>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
