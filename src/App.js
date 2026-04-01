import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [hora, setHora] = useState(new Date());
  const [modoDigital, setModoDigital] = useState(true);

  const horaAtual = hora.getHours();
  const isNoite = horaAtual >= 19 || horaAtual < 6;

  const temaPorHorario = () => {
    if (horaAtual >= 6 && horaAtual < 12) {
      return {
        background: "linear-gradient(135deg, #ffd89b 0%, #c7e9fb 50%, #19547b 100%)",
        texto: "#ffffff",
        botaoTexto: "#19547b",
      };
    }

    if (horaAtual >= 12 && horaAtual < 17) {
      return {
        background: "linear-gradient(135deg, #56ccf2 0%, #2f80ed 50%, #0f2b4d 100%)",
        texto: "#ffffff",
        botaoTexto: "#1e3f8f",
      };
    }

    if (horaAtual >= 17 && horaAtual < 19) {
      return {
        background: "linear-gradient(135deg, #f2994a 0%, #eb5757 50%, #2c3e50 100%)",
        texto: "#ffffff",
        botaoTexto: "#2c3e50",
      };
    }

    return {
      background: "linear-gradient(135deg, #0a0f2a 0%, #1a1f3a 25%, #2a2f4a 50%, #1a1f3a 75%, #0a0f2a 100%)",
      texto: "#f8fafc",
      botaoTexto: "#0f172a",
    };
  };

  const temaAtual = temaPorHorario();

  useEffect(() => {
    const timer = setInterval(() => setHora(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Estilos Base
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100vh",
    background: temaAtual.background,
    color: temaAtual.texto,
    position: "relative",
    overflow: "hidden",
    fontFamily: "'IBM Plex Sans', 'Segoe UI', 'Roboto', sans-serif",
    transition: "background 1s ease-in-out",
  };

  const glassStyle = {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "all 0.3s ease",
    zIndex: 2,
  };

  const renderAnalogico = () => {
    const s = hora.getSeconds();
    const m = hora.getMinutes();
    const h = hora.getHours();

    const segDeg = s * 6;
    const minDeg = m * 6 + s * 0.1;
    const horDeg = (h % 12) * 30 + m * 0.5;

    // Estilo base para todos os ponteiros
    const ponteiroBase = (deg, width, height, color, zIndex) => ({
      position: "absolute",
      bottom: "50%",
      left: "50%",
      transform: `translateX(-50%) rotate(${deg}deg)`,
      transformOrigin: "bottom center",
      width: width,
      height: height,
      backgroundColor: color,
      borderRadius: "10px",
      zIndex: zIndex,
      transition: s === 0 ? "none" : "transform 0.5s cubic-bezier(0.4, 2.08, 0.55, 0.44)",
    });

    // Criar marcadores de horas (1-12)
    const marcadores = [];
    for (let i = 1; i <= 12; i++) {
      const angulo = (i * 30) - 90;
      const radiano = (angulo * Math.PI) / 180;
      const raio = 100;
      const x = 125 + raio * Math.cos(radiano);
      const y = 125 + raio * Math.sin(radiano);
      
      marcadores.push(
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${x}px`,
            top: `${y}px`,
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "14px",
            fontWeight: "bold",
            textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
          }}
        >
          {i}
        </div>
      );
    }

    return (
      <div style={{
        position: "relative",
        width: "250px",
        height: "250px",
        borderRadius: "50%",
        border: "4px solid rgba(255,255,255,0.5)",
        marginBottom: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0,0,0,0.2)",
        boxShadow: "0 0 20px rgba(0,0,0,0.3)",
      }}>
        {/* Marcadores dos números */}
        {marcadores}
        
        {/* Ponteiros */}
        <div style={ponteiroBase(horDeg, "6px", "60px", "white", 3)}></div>
        <div style={ponteiroBase(minDeg, "4px", "80px", "#ddd", 2)}></div>
        <div style={ponteiroBase(segDeg, "2px", "90px", "#ff4757", 1)}></div>
        
        {/* Centro do Relógio */}
        <div style={{
          width: "12px",
          height: "12px",
          backgroundColor: "white",
          borderRadius: "50%",
          zIndex: 10,
          boxShadow: "0 0 5px rgba(0,0,0,0.3)",
        }}></div>
      </div>
    );
  };

  // Componente de estrelas melhorado
  const Estrelas = () => {
    const estrelas = [];
    const numEstrelas = 150;
    
    for (let i = 0; i < numEstrelas; i++) {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const tamanho = Math.random() * 3 + 1;
      const animacaoDelay = Math.random() * 5;
      const brilho = Math.random() * 0.5 + 0.5;
      
      estrelas.push(
        <div
          key={i}
          className="estrela"
          style={{
            position: "absolute",
            top: `${top}%`,
            left: `${left}%`,
            width: `${tamanho}px`,
            height: `${tamanho}px`,
            backgroundColor: `rgba(255, 255, 255, ${brilho})`,
            borderRadius: "50%",
            animationDelay: `${animacaoDelay}s`,
            boxShadow: `0 0 ${tamanho * 2}px rgba(255, 255, 255, ${brilho * 0.8})`,
          }}
        />
      );
    }
    
    return <div className="stars-container">{estrelas}</div>;
  };

  // Componente de lua
  const Lua = () => (
    <div className="lua">
      <div className="lua-crateras"></div>
      <div className="lua-sombra"></div>
    </div>
  );

  // Componente de sol
  const Sol = () => (
    <div className="sol">
      <div className="sol-raio"></div>
      <div className="sol-raio"></div>
      <div className="sol-raio"></div>
      <div className="sol-raio"></div>
      <div className="sol-raio"></div>
      <div className="sol-raio"></div>
      <div className="sol-raio"></div>
      <div className="sol-raio"></div>
    </div>
  );

  // Nuvens para o dia
  const Nuvens = () => (
    <>
      <div className="nuvem nuvem1"></div>
      <div className="nuvem nuvem2"></div>
      <div className="nuvem nuvem3"></div>
    </>
  );

  return (
    <div style={containerStyle}>
      {/* Elementos decorativos conforme horário */}
      {isNoite ? (
        <>
          <Estrelas />
          <Lua />
        </>
      ) : (
        <>
          <Sol />
          <Nuvens />
        </>
      )}
      
      {/* Efeito de brilho adicional para a noite */}
      {isNoite && (
        <div className="brilho-estrelas"></div>
      )}

      <div style={glassStyle}>
        <h2 style={{ 
          margin: "0 0 20px 0", 
          fontWeight: "300", 
          letterSpacing: "2px",
          fontSize: "1.8rem",
          fontFamily: "'Playfair Display', 'Times New Roman', serif",
        }}>
          {temaAtual.titulo}
        </h2>

        {modoDigital ? (
          <div style={{ 
            fontSize: "5rem", 
            fontWeight: "bold", 
            marginBottom: "30px", 
            textShadow: "2px 2px 10px rgba(0,0,0,0.2)",
            fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
            letterSpacing: "3px",
            fontVariantNumeric: "tabular-nums",
            fontFeatureSettings: '"tnum" 1',
          }}>
            {hora.toLocaleTimeString('pt-BR', { hour12: false })}
          </div>
        ) : (
          renderAnalogico()
        )}

        <div style={{ 
          fontSize: "0.9rem", 
          opacity: 0.8, 
          marginBottom: "30px",
          background: "rgba(0,0,0,0.3)",
          padding: "8px 16px",
          borderRadius: "20px",
        }}>
          {Intl.DateTimeFormat().resolvedOptions().timeZone}
        </div>

        <button
          onClick={() => setModoDigital(!modoDigital)}
          style={{
            padding: "12px 24px",
            borderRadius: "50px",
            border: "none",
            backgroundColor: "white",
            color: temaAtual.botaoTexto,
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
          }}
        >
          Mudar para {modoDigital ? "Analógico" : "Digital"}
        </button>
      </div>
      
      <div style={{ 
        position: "absolute", 
        bottom: "20px", 
        fontSize: "0.7rem", 
        opacity: 0.5,
        zIndex: 2,
      }}>
        {new Date().toLocaleDateString('pt-BR', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </div>
    </div>
  );
}

export default App;