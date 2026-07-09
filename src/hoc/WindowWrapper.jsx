import useWindowStore from "#store/window";
import React, { useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

const WindowWrapper = (Component,windowKey) => {

    const Wrapped=(props)=>{
        const {windows,focusWindow}=useWindowStore();
        const {isOpen,zIndex,isMinimized,isMaximized}=windows[windowKey];
        const ref=useRef(null);

        useGSAP(()=>{
            const el=ref.current;
            if(!el || !isOpen) return;
            el.style.display="block";
            gsap.fromTo(el,{scale:0.8,opacity:0,y:40},{scale:1,opacity:1,y:0,duration:0.4,ease:"power3.out"});
        },[isOpen, isMinimized]);

        useGSAP(() => {
            const el = ref.current;
            if (!el || isMaximized) return;

            const [instance] = Draggable.create(el, {
                onPress() {
                    focusWindow(windowKey);
                }
            });

            return () => instance.kill();
        }, [isMaximized]);

        useLayoutEffect(() => {
            const el = ref.current;
            if (!el) return;

            el.style.display =
                isOpen && !isMinimized
                    ? "block"
                    : "none";
        }, [isOpen, isMinimized]);

        return(
            <section id={windowKey} 
                     ref={ref} 
                     className="absolute" 
                     style={{zIndex,width: isMaximized ? "100vw" : "",height: isMaximized ? "100vh" : "",top: isMaximized ? 0 : "",left: isMaximized ? 0 : "",borderRadius: isMaximized ? 0 : ""}}
                      >
                <Component {...props} />
            </section>
        )
    };

    Wrapped.displayName=`WindowWrapper(${Component.displayName || Component.name || 'Component'})`;
    return Wrapped;
};
export default WindowWrapper
