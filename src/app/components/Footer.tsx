"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">
                            AppliedAgentic
                        </h3>
                        <p className="text-slate-500 max-w-sm mb-6 text-sm">
                            The definitive platform for mastering Agentic AI and Production Machine Learning systems.
                        </p>
                        <div className="flex gap-4">
                            <SocialLink href="#" icon={<Github className="w-4 h-4" />} />
                            <SocialLink href="#" icon={<Twitter className="w-4 h-4" />} />
                            <SocialLink href="#" icon={<Linkedin className="w-4 h-4" />} />
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">Learn</h4>
                        <ul className="space-y-2"><FooterLink href="/category/agentic-ai">Agentic AI</FooterLink><FooterLink href="/category/generative-ai">Generative AI</FooterLink><FooterLink href="/category/rag-knowledge">RAG & Knowledge</FooterLink></ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">Platform</h4>
                        <ul className="space-y-2"><FooterLink href="/admin">Admin Portal</FooterLink><FooterLink href="#">Documentation</FooterLink><FooterLink href="#">Support</FooterLink></ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} AppliedAgentic. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link
                href={href}
                className="text-slate-500 hover:text-blue-600 transition-colors text-sm"
            >
                {children}
            </Link>
        </li>
    );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <a
            href={href}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-slate-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
        >
            {icon}
        </a>
    );
}
