import { motion } from "framer-motion";

export default function AnimatedBorder() {
    return (
        <div className="absolute inset-0 pointer-events-none m-9">
            {/* Topo */}
            <motion.div
                className="absolute top-0 left-0 h-[3px] bg-gray-400"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.6, ease: "easeOut"}}
            />
            {/* Direita */}
            <motion.div
                className="absolute top-0 right-0 w-[3px] bg-gray-400"
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            />
            {/* Fundo */}
            <motion.div
                className="absolute bottom-0 right-0 h-[3px] bg-gray-400"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
            />
            {/* Esquerda */}
            <motion.div
                className="absolute bottom-0 left-0 w-[3px] bg-gray-400"
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 0.6, delay: 1.8, ease: "easeOut" }}
            />
        </div>
    );
}
