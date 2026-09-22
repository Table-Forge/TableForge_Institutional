"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";
import { createForgeBurnRenderer } from "./forge-burn-renderer";
import { BURN_ORIGIN, FORGE_STAGE } from "./forge-palette";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, Physics2DPlugin);
}

const SCROLL_DISTANCE = "+=420%";
const STORY_END = 0.9;
const READING_HOLD = 0.28;
const STRIKE_PROGRESS = STORY_END / (STORY_END + READING_HOLD);
const STRIKE_LOCK_PROGRESS = STRIKE_PROGRESS + 0.01;
const STRIKE_RELEASE_PROGRESS = STRIKE_PROGRESS - 0.002;
const READING_LOCK_MS = 1200;
const SCROLL_LOCK_TIMEOUT_MS = 5000;
const CAMERA_DEPTH = 1000;
const CAMERA_LEAN = 40;
const DESKTOP_MIN_WIDTH = 1024;
const DESKTOP_STAGE_SHIFT = 0.14;
const GRIP = { x: 1230, y: 603 };
const STORY_COMPLETED_KEY = "forge-hero-story-completed";

const readStoryCompleted = () => {
  try {
    return window.sessionStorage.getItem(STORY_COMPLETED_KEY) === "1";
  } catch {
    return false;
  }
};

const markStoryCompleted = () => {
  try {
    window.sessionStorage.setItem(STORY_COMPLETED_KEY, "1");
  } catch {
    return;
  }
};

const syncAmbient = (ambient: gsap.core.Timeline) => (self: ScrollTrigger) => {
  if (self.isActive) {
    ambient.play();
  } else {
    ambient.pause();
  }
};
const DIE_BASE = { x: 350, y: 82 };
const SCROLL_KEYS = new Set(["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Space", "Home", "End"]);

export function useForgeScrollytelling(rootRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const select = gsap.utils.selector(root);
      const one = <T extends Element>(key: string) => select<T>(`[data-forge="${key}"]`)[0];
      const many = <T extends Element>(key: string) => select<T>(`[data-forge="${key}"]`);

      const canvas = one<HTMLCanvasElement>("burn-canvas");
      const renderer = createForgeBurnRenderer(canvas);
      const burn = { progress: 0, dirty: true };
      const tension = { value: 0 };
      const pose = { hammer: 0, lift: 0, dieX: 1, dieY: 1 };
      const hammer = one("hammer");
      const die = one("die");

      const applyPose = () => {
        hammer.setAttribute("transform", `translate(0 ${-pose.lift}) rotate(${pose.hammer} ${GRIP.x} ${GRIP.y})`);
        die.setAttribute(
          "transform",
          `translate(${DIE_BASE.x} ${DIE_BASE.y}) scale(${pose.dieX} ${pose.dieY}) translate(${-DIE_BASE.x} ${-DIE_BASE.y})`,
        );
      };

      const desktopStageShift = () => {
        const width = root.getBoundingClientRect().width;
        return width >= DESKTOP_MIN_WIDTH ? Math.round(width * DESKTOP_STAGE_SHIFT) : 0;
      };

      root.style.setProperty("--forge-stage-shift", "0px");

      const syncViewport = () => {
        const { width, height } = root.getBoundingClientRect();
        const stageScale = Math.max(width / FORGE_STAGE.width, height / FORGE_STAGE.height);
        root.style.setProperty("--forge-stage-scale", stageScale.toFixed(4));
        if (!renderer) return;
        renderer.resize(width, height, Math.min(window.devicePixelRatio || 1, 2));
        renderer.setOrigin(
          width / 2 + (BURN_ORIGIN.x - FORGE_STAGE.width / 2) * stageScale,
          height / 2 + (BURN_ORIGIN.y - FORGE_STAGE.height / 2) * stageScale,
        );
        burn.dirty = true;
      };
      const resizeObserver = new ResizeObserver(syncViewport);
      resizeObserver.observe(root);
      syncViewport();

      const renderBurn = () => {
        if (!renderer) return;
        const burning = burn.progress > 0 && burn.progress < 1;
        if (!burning && !burn.dirty) return;
        burn.dirty = false;
        renderer.render(burn.progress, performance.now() / 1000);
      };

      if (renderer) {
        gsap.ticker.add(renderBurn);
      } else {
        gsap.set(canvas, { autoAlpha: 0 });
      }

      applyPose();
      gsap.set(one("content"), { autoAlpha: 0 });

      const scrollLock = { active: false, position: 0 };
      const blockScrollEvent = (event: Event) => {
        if (scrollLock.active) event.preventDefault();
      };
      const blockScrollKeys = (event: KeyboardEvent) => {
        if (scrollLock.active && SCROLL_KEYS.has(event.code)) event.preventDefault();
      };
      const holdScrollPosition = () => {
        if (scrollLock.active && Math.abs(window.scrollY - scrollLock.position) > 1) {
          window.scrollTo(0, scrollLock.position);
        }
      };
      window.addEventListener("wheel", blockScrollEvent, { passive: false });
      window.addEventListener("touchmove", blockScrollEvent, { passive: false });
      window.addEventListener("keydown", blockScrollKeys);
      window.addEventListener("scroll", holdScrollPosition, { passive: true });

      const buildMaster = () => {
        const timeline = gsap.timeline({ paused: true, defaults: { ease: "none" } });
        const doorLeft = one("door-left");
        const doorRight = one("door-right");
        const world = one("world");

        timeline
          .to(one("ignite"), { autoAlpha: 0, scale: 0.4, transformOrigin: "50% 50%", duration: 0.06, ease: "power2.in" }, 0)
          .to(one("scroll-prompt"), { autoAlpha: 0, duration: 0.04 }, 0.02)
          .to(
            burn,
            {
              progress: 1,
              duration: 0.19,
              ease: "power1.in",
              onUpdate: () => {
                burn.dirty = true;
              },
            },
            0.01,
          )
          .set(canvas, { autoAlpha: 0 }, 0.205)
          .to(one("hud"), { autoAlpha: 1, duration: 0.06 }, 0.1)
          .to(one("seam-glow"), { autoAlpha: 0, duration: 0.05 }, 0.22)
          .to(doorLeft, { rotationY: 84, transformOrigin: "10px 50%", duration: 0.14, ease: "power2.inOut" }, 0.21)
          .to(doorRight, { rotationY: -84, transformOrigin: "262px 50%", duration: 0.14, ease: "power2.inOut" }, 0.21)
          .to(world, { z: CAMERA_DEPTH, duration: 0.4, ease: "power1.inOut" }, 0.26)
          .to(root, { "--forge-stage-shift": () => `${desktopStageShift()}px`, duration: 0.4, ease: "power1.inOut" }, 0.26)
          .to([one("arch"), doorLeft, doorRight], { autoAlpha: 0, duration: 0.08 }, 0.5)
          .fromTo(one("hammer-layer"), { y: 640 }, { y: 0, duration: 0.1, ease: "power2.out" }, 0.6)
          .to(pose, { hammer: 60, lift: 50, duration: 0.2, ease: "power2.inOut", onUpdate: applyPose }, 0.7)
          .to(tension, { value: 1, duration: 0.2 }, 0.7)
          .to(one("die-heat"), { opacity: 0.85, duration: 0.2 }, 0.7)
          .to(world, { z: CAMERA_DEPTH + CAMERA_LEAN, duration: 0.2, ease: "power1.in" }, 0.7)
          .to({}, { duration: READING_HOLD }, STORY_END);

        return timeline;
      };

      const buildStrike = () => {
        const timeline = gsap.timeline({ paused: true, defaults: { immediateRender: false } });

        timeline
          .to(pose, { hammer: 0, lift: 0, duration: 0.14, ease: "power4.in", onUpdate: applyPose }, 0)
          .to(pose, { dieX: 1.08, dieY: 0.88, duration: 0.06, ease: "power2.out", onUpdate: applyPose }, 0.14)
          .to(pose, { dieX: 1, dieY: 1, duration: 0.35, ease: "elastic.out(1, 0.45)", onUpdate: applyPose }, 0.2)
          .to(tension, { value: 0, duration: 0.12 }, 0.14)
          .fromTo(one("die-heat"), { opacity: 0.85 }, { opacity: 1, duration: 0.05 }, 0.14)
          .to(one("die-heat"), { opacity: 0, duration: 0.9 }, 0.2)
          .fromTo(one("flash"), { opacity: 0 }, { opacity: 0.95, duration: 0.05 }, 0.14)
          .to(one("flash"), { opacity: 0, duration: 0.5, ease: "power2.out" }, 0.19)
          .fromTo(
            one("shockwave"),
            { attr: { rx: 12, ry: 5 }, opacity: 1, strokeWidth: 14 },
            { attr: { rx: 1150, ry: 360 }, opacity: 0, strokeWidth: 1, duration: 0.75, ease: "power3.out" },
            0.14,
          )
          .fromTo(
            one("impact-glow"),
            { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" },
            { opacity: 1, scale: 1, duration: 0.06 },
            0.14,
          )
          .to(one("impact-glow"), { opacity: 0, scale: 1.8, duration: 0.7, ease: "power2.out" }, 0.2)
          .to(
            one("shaker"),
            { keyframes: { x: [0, 16, -13, 10, -6, 3, 0], y: [0, -10, 8, -6, 4, -2, 0], ease: "power1.out" }, duration: 0.55 },
            0.14,
          )
          .to(pose, { hammer: 9, lift: 8, duration: 0.12, ease: "power2.out", onUpdate: applyPose }, 0.15)
          .to(pose, { hammer: 0, lift: 0, duration: 0.22, ease: "power2.inOut", onUpdate: applyPose }, 0.27)
          .fromTo(
            one("content"),
            { autoAlpha: 0, y: 46, scale: 0.96 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" },
            0.45,
          );

        many("spark").forEach((spark) => {
          timeline.fromTo(
            spark,
            { x: 0, y: 0, opacity: 1, scale: 1 },
            {
              physics2D: {
                velocity: gsap.utils.random(420, 1500),
                angle: gsap.utils.random(-168, -12),
                gravity: 1900,
              },
              opacity: 0,
              scale: 0.3,
              duration: gsap.utils.random(0.6, 1.3),
              ease: "none",
            },
            0.14,
          );
        });

        return timeline;
      };

      const buildAmbient = () => {
        const timeline = gsap.timeline({ paused: true });
        const loop = (target: gsap.TweenTarget, vars: gsap.TweenVars) =>
          timeline.add(gsap.to(target, { yoyo: true, repeat: -1, ease: "sine.inOut", ...vars }), 0);

        many("flame").forEach((flame, index) => {
          loop(flame, {
            scaleY: 1.05 + index * 0.03,
            skewX: index % 2 === 0 ? -4 : 4,
            duration: 0.26 + index * 0.06,
            transformOrigin: "50% 100%",
          });
        });
        timeline.add(gsap.to(one("flame-noise"), { attr: { seed: 8 }, duration: 0.8, ease: "steps(8)", repeat: -1 }), 0);
        many("torch-flame").forEach((flame, index) => {
          loop(flame, { scaleY: 1.12, skewX: index === 0 ? -5 : 5, duration: 0.22 + index * 0.05, transformOrigin: "50% 100%" });
        });
        loop(one("furnace-glow"), { opacity: 0.7, duration: 0.9 });
        loop(one("haze-pulse"), { opacity: 0.6, duration: 1.4 });
        loop(one("fire-glow"), { opacity: 0.7, scale: 1.08, duration: 0.5, transformOrigin: "50% 50%" });
        loop(one("die-glow"), { opacity: 0.55, duration: 0.5 });
        loop(one("ignite-glow"), { scale: 1.18, opacity: 0.65, duration: 0.9, transformOrigin: "50% 50%" });
        loop(one("seam-pulse"), { opacity: 0.6, duration: 0.7 });

        many("furnace-ember").forEach((ember, index) => {
          timeline.add(
            gsap.to(ember, {
              keyframes: [
                { x: 0, y: 0, opacity: 0, duration: 0 },
                { opacity: 1, y: -70, duration: 0.5 },
                { y: -320 - (index % 3) * 60, x: index % 2 === 0 ? 24 : -24, opacity: 0, duration: 1.7, ease: "power1.in" },
              ],
              repeat: -1,
              delay: index * 0.23,
            }),
            0,
          );
        });

        timeline.add(
          gsap.to(one("hammer-shake"), {
            x: 1,
            y: 1,
            rotation: 1,
            duration: 0.07,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            modifiers: {
              x: gsap.utils.unitize((value: number) => value * tension.value * 10, "px"),
              y: gsap.utils.unitize((value: number) => value * tension.value * 8, "px"),
              rotation: gsap.utils.unitize((value: number) => value * tension.value * 1.4, "deg"),
            },
          }),
          0,
        );

        return timeline;
      };

      const header = document.querySelector("header");
      const matchMedia = gsap.matchMedia();

      matchMedia.add(
        { reduced: "(prefers-reduced-motion: reduce)", full: "(prefers-reduced-motion: no-preference)" },
        (context) => {
          const master = buildMaster();
          const strike = buildStrike();
          const reducedMotion = Boolean(context.conditions?.reduced);

          if (reducedMotion || readStoryCompleted()) {
            master.progress(1);
            strike.progress(1);
            if (reducedMotion) return;
            ScrollTrigger.create({
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              onToggle: syncAmbient(buildAmbient()),
            });
            return;
          }

          const ambient = buildAmbient();
          let struck = false;
          let unlockTimeout = 0;

          const releaseScroll = () => {
            scrollLock.active = false;
            window.clearTimeout(unlockTimeout);
          };
          strike.eventCallback("onComplete", () => {
            markStoryCompleted();
            window.clearTimeout(unlockTimeout);
            unlockTimeout = window.setTimeout(releaseScroll, READING_LOCK_MS);
          });

          ScrollTrigger.create({
            animation: master,
            trigger: root,
            start: () => `top ${header?.getBoundingClientRect().height ?? 0}px`,
            end: SCROLL_DISTANCE,
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onToggle: syncAmbient(ambient),
            onUpdate: (self) => {
              if (!struck && self.progress >= STRIKE_PROGRESS) {
                struck = true;
                scrollLock.active = true;
                scrollLock.position = Math.ceil(self.start + (self.end - self.start) * STRIKE_LOCK_PROGRESS);
                window.scrollTo(0, scrollLock.position);
                self.getTween()?.progress(1);
                unlockTimeout = window.setTimeout(releaseScroll, SCROLL_LOCK_TIMEOUT_MS);
                strike.play();
              } else if (struck && self.progress < STRIKE_RELEASE_PROGRESS) {
                struck = false;
                releaseScroll();
                strike.reverse();
              }
            },
          });

          return releaseScroll;
        },
      );

      return () => {
        resizeObserver.disconnect();
        gsap.ticker.remove(renderBurn);
        window.removeEventListener("wheel", blockScrollEvent);
        window.removeEventListener("touchmove", blockScrollEvent);
        window.removeEventListener("keydown", blockScrollKeys);
        window.removeEventListener("scroll", holdScrollPosition);
        renderer?.destroy();
      };
    },
    { scope: rootRef },
  );
}
