import { useEffect, useRef } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";


export function SignInRedirect() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const hasRedirected = useRef(false);

  useEffect(() => {
   
    if (isSignedIn && !hasRedirected.current) {
      
      const protectedPaths = ["/dashboard", "/host", "/play", "/quiz"];
      const isOnProtectedPath = protectedPaths.some(path => location.pathname.startsWith(path));

      if (!isOnProtectedPath) {
        hasRedirected.current = true;
        navigate("/dashboard");
      }
    }
  }, [isSignedIn, navigate, location.pathname]);

  return null; 
}
