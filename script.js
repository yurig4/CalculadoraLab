// --- Elementos Globais ---
const selectCompostoEl = document.getElementById('composto');
const selectAcidoEl = document.getElementById('acido');
const customConcentracaoGroup = document.getElementById('custom-concentracao-group');
const customConcentracaoInput = document.getElementById('custom-concentracao');
const selectMeioEl = document.getElementById('meio');
// Novos elementos para Tampão
const selectSistemaTampaoEl = document.getElementById('sistemaTampao');
const manualPkaGroup = document.getElementById('manual-pka-group');
const manualPkaInput = document.getElementById('manualPka');
const componentesInfoDiv = document.getElementById('componentes-info');
const resultadoTampaoDiv = document.getElementById('resultado-tampao');


// --- Dados Calculadora de Concentração ---
const compostos = [
    { nome: "Cloreto de sódio", formula: "NaCl", massaMolar: 58.44 },
    { nome: "Hidróxido de sódio", formula: "NaOH", massaMolar: 40.00 },
    { nome: "Carbonato de cálcio", formula: "CaCO₃", massaMolar: 100.09 },
    { nome: "Sulfato de sódio", formula: "Na₂SO₄", massaMolar: 142.04 },
    { nome: "Nitrato de prata", formula: "AgNO₃", massaMolar: 169.87 },
    { nome: "Hidróxido de potássio", formula: "KOH", massaMolar: 56.11 },
    { nome: "Cloreto de potássio", formula: "KCl", massaMolar: 74.55 },
    { nome: "Sulfato de magnésio", formula: "MgSO₄", massaMolar: 120.37 }, // Nome mais completo
    { nome: "Óxido de cálcio", formula: "CaO", massaMolar: 56.08 },
    { nome: "Carbonato de sódio", formula: "Na₂CO₃", massaMolar: 105.99 },
    { nome: "Nitrato de sódio", formula: "NaNO₃", massaMolar: 84.99 },
    { nome: "Cloreto de cálcio", formula: "CaCl₂", massaMolar: 110.98 },
    { nome: "Sulfato de cobre(II)", formula: "CuSO₄", massaMolar: 159.61 }, // Nome mais completo
    { nome: "Óxido de zinco", formula: "ZnO", massaMolar: 81.38 },
    { nome: "Hidróxido de cálcio", formula: "Ca(OH)₂", massaMolar: 74.09 },
    { nome: "Sulfato de ferro(II)", formula: "FeSO₄", massaMolar: 151.91 }, // Nome correto
    { nome: "Cloreto de ferro(III)", formula: "FeCl₃", massaMolar: 162.20 }, // Nome correto
    { nome: "Nitrato de potássio", formula: "KNO₃", massaMolar: 101.10 },
    { nome: "Óxido de cobre(II)", formula: "CuO", massaMolar: 79.55 },
    { nome: "Sulfato de alumínio", formula: "Al₂(SO₄)₃", massaMolar: 342.15 },
    { nome: "Bicarbonato de sódio", formula: "NaHCO₃", massaMolar: 84.01 }, // Nome alternativo
    { nome: "Fosfato de sódio (tribásico)", formula: "Na₃PO₄", massaMolar: 163.94 }, // Nome mais específico
    { nome: "Óxido de ferro(III)", formula: "Fe₂O₃", massaMolar: 159.69 }, // Nome correto
    { nome: "Sulfato de bário", formula: "BaSO₄", massaMolar: 233.38 },
    { nome: "Cloreto de amônio", formula: "NH₄Cl", massaMolar: 53.49 },
    { nome: "Óxido de alumínio", formula: "Al₂O₃", massaMolar: 101.96 },
    { nome: "Nitrato de amônio", formula: "NH₄NO₃", massaMolar: 80.04 },
    { nome: "Dióxido de carbono", formula: "CO₂", massaMolar: 44.01 }, // Embora gás, pode ser relevante para cálculos teóricos
    { nome: "Sulfato de potássio", formula: "K₂SO₄", massaMolar: 174.26 },
    { nome: "Sulfato de amônio", formula: "(NH₄)₂SO₄", massaMolar: 132.14 },
    { nome: "Cloreto de bário", formula: "BaCl₂", massaMolar: 208.23 },
    { nome: "Nitrato de cálcio", formula: "Ca(NO₃)₂", massaMolar: 164.09 },
    { nome: "Dióxido de enxofre", formula: "SO₂", massaMolar: 64.07 }, // Gás
    { nome: "Permanganato de potássio", formula: "KMnO₄", massaMolar: 158.03 },
    { nome: "Dicromato de potássio", formula: "K₂Cr₂O₇", massaMolar: 294.18 },
    { nome: "Hidróxido de magnésio", formula: "Mg(OH)₂", massaMolar: 58.32 },
    { nome: "Sulfato de cálcio", formula: "CaSO₄", massaMolar: 136.14 },
    { nome: "Cloreto de prata", formula: "AgCl", massaMolar: 143.32 },
    { nome: "Dióxido de silício", formula: "SiO₂", massaMolar: 60.08 },
    { nome: "Acetato de sódio", formula: "CH₃COONa", massaMolar: 82.03 },
    { nome: "Sulfito de sódio", formula: "Na₂SO₃", massaMolar: 126.04 },
    { nome: "Carbonato de potássio", formula: "K₂CO₃", massaMolar: 138.21 },
    { nome: "Sulfato de zinco", formula: "ZnSO₄", massaMolar: 161.47 },
    { nome: "Fluoreto de sódio", formula: "NaF", massaMolar: 41.99 },
    { nome: "Brometo de potássio", formula: "KBr", massaMolar: 119.00 },
    { nome: "Iodeto de potássio", formula: "KI", massaMolar: 166.00 },
    { nome: "Nitrito de sódio", formula: "NaNO₂", massaMolar: 69.00 },
    { nome: "Peróxido de sódio", formula: "Na₂O₂", massaMolar: 77.98 },
    { nome: "Sulfeto de sódio", formula: "Na₂S", massaMolar: 78.04 },
];

// --- Dados Calculadora de Meios ---
const meios = [
    { nome: "Ágar BS (Bismuth Sulfite Agar)", fator: 52, instrucao: "Pesar <span class='destaque'>{peso}g</span> de {meio}, suspender em {volume}mL de água destilada, aquecer até ferver para dissolver completamente. NÃO AUTOCLAVAR. Resfriar a 45-50°C e distribuir em placas de Petri estéreis. Preparar no dia do uso!" },
    { nome: "Ágar HE (Hectoen Enteric Agar)", fator: 76.62, instrucao: "Pesar <span class='destaque'>{peso}g</span> de {meio}, suspender em {volume}mL de água destilada, aquecer até ferver para dissolver completamente. NÃO AUTOCLAVAR. Resfriar a 45-50°C e distribuir em placas de Petri estéreis." },
    { nome: "Ágar LIA (Lysine Iron Agar)", fator: 34.1, instrucao: "Pesar <span class='destaque'>{peso}g</span> de {meio}, suspender em {volume}mL de água destilada, aquecer com agitação frequente e ferver por 1 minuto para dissolver completamente. Distribuir em tubos (aprox. 4mL/tubo), autoclavar a 121°C por 15 minutos. Deixar solidificar com a base profunda (butt) e a superfície inclinada (slant)." },
    { nome: "Ágar TSI (Triple Sugar Iron Agar)", fator: 64.5, instrucao: "Pesar <span class='destaque'>{peso}g</span> de {meio}, suspender em {volume}mL de água destilada, aquecer com agitação frequente e ferver por 1 minuto para dissolver completamente. Distribuir em tubos (aprox. 7mL/tubo), autoclavar a 121°C por 15 minutos. Deixar solidificar com a base profunda (butt) e a superfície inclinada (slant)." },
    { nome: "Ágar XLD (Xylose-Lysine Deoxycholate Agar)", fator: 56.68, instrucao: "Pesar <span class='destaque'>{peso}g</span> de {meio}, suspender em {volume}mL de água destilada, aquecer com agitação frequente até próximo da fervura para dissolver completamente (NÃO FERVER). NÃO AUTOCLAVAR. Resfriar a 45-50°C e distribuir em placas de Petri estéreis." },
    { nome: "Caldo Lactosado (Lactose Broth)", fator: 13, instrucao: "Pesar <span class='destaque'>{peso}g</span> de {meio}, dissolver em {volume}mL de água destilada. Distribuir em recipientes finais (ex: tubos com tubos de Durham, se necessário) e autoclavar a 121°C por 15 minutos." },
    { nome: "Caldo Rappaport (Rappaport Vassiliadis Soy Peptone Broth)", fator: 26.6, instrucao: "Pesar <span class='destaque'>{peso}g</span> de {meio}, dissolver em {volume}mL de água destilada. Distribuir em tubos (aprox. 10mL/tubo) e autoclavar a 115°C por 15 minutos (ATENÇÃO à temperatura e tempo específicos)." }, // Fator e instrução ajustados conforme fabricantes comuns
    { nome: "Caldo TT (Tetrathionate Broth Base)", fator: 46, instrucao: "Pesar <span class='destaque'>{peso}g</span> da base {meio}, dissolver em {volume}mL de água destilada e aquecer até ferver. Resfriar abaixo de 45°C. Imediatamente antes do uso, adicionar 20mL de solução iodo-iodeto (6g iodo + 5g iodeto de potássio em 20mL água) POR LITRO de base e 10mL de solução a 0.1% de Verde Brilhante (opcional) POR LITRO. Ajustar proporção para o volume final. Distribuir assepticamente. NÃO AUTOCLAVAR APÓS ADIÇÃO DE IODO." },
    { nome: "Caldo Verde Brilhante Bile 2% (Brilliant Green Bile Broth 2%)", fator: 40, instrucao: "Pesar <span class='destaque'>{peso}g</span> de {meio}, dissolver em {volume}mL de água destilada. Distribuir em tubos contendo tubos de Durham invertidos e autoclavar a 121°C por 15 minutos." },
    { nome: "EC Broth (Caldo EC)", fator: 37, instrucao: "Pesar <span class='destaque'>{peso}g</span> de {meio}, dissolver em {volume}mL de água destilada. Distribuir em tubos contendo tubos de Durham invertidos e autoclavar a 121°C por 15 minutos." },
    { nome: "LST Broth (Lauryl Sulfate Tryptose Broth)", fator: 35.6, instrucao: "Pesar <span class='destaque'>{peso}g</span> de {meio}, dissolver em {volume}mL de água destilada. Distribuir em tubos contendo tubos de Durham invertidos e autoclavar a 121°C por 15 minutos." }, // Fator ajustado
    { nome: "Água Peptonada Tamponada 0.1%", fator: 0, instrucao: "Para {volume}mL: Pesar <span class='destaque'>{p1}g</span> de Peptona, <span class='destaque'>{p2}g</span> de NaCl, <span class='destaque'>{p3}g</span> de Na₂HPO₄ (anidro) e <span class='destaque'>{p4}g</span> de KH₂PO₄ (anidro). Dissolver em {volume}mL de água destilada. Ajustar pH para 7.2 ± 0.2, se necessário. Distribuir e autoclavar a 121°C por 15 minutos." } // Alterado para Água Peptonada Tamponada, mais comum
];

// --- Dados Calculadora de Tampão ---
const sistemasTampao = [
    {
        nome: "Acetato (Ácido Acético / Acetato de Sódio)",
        pKa: 4.76,
        rangeUtil: [3.8, 5.8],
        componenteAcido: { nome: "Ácido Acético Glacial", formula: "CH₃COOH", forma: "liquido", MM: 60.05, pureza: 0.997, densidade: 1.049 },
        componenteBase: { nome: "Acetato de Sódio (Anidro)", formula: "CH₃COONa", forma: "solido", MM: 82.03 }
    },
    {
        nome: "Fosfato (NaH₂PO₄ / Na₂HPO₄)",
        pKa: 7.21,
        rangeUtil: [6.2, 8.2],
        // Usar formas ANIDRAS como padrão, comum em laboratório. MM ajustadas.
        componenteAcido: { nome: "Fosfato de Sódio Monobásico (Anidro)", formula: "NaH₂PO₄", forma: "solido", MM: 119.98 },
        componenteBase: { nome: "Fosfato de Sódio Dibásico (Anidro)", formula: "Na₂HPO₄", forma: "solido", MM: 141.96 }
        // Poderia adicionar entradas separadas para formas hidratadas (ex: NaH2PO4·H2O MM=137.99, Na2HPO4·7H2O MM=268.07)
    },
    {
        nome: "Fosfato (KH₂PO₄ / K₂HPO₄)", // Alternativa com Potássio
        pKa: 7.20, // Ligeiramente diferente
        rangeUtil: [6.2, 8.2],
        componenteAcido: { nome: "Fosfato de Potássio Monobásico", formula: "KH₂PO₄", forma: "solido", MM: 136.09 },
        componenteBase: { nome: "Fosfato de Potássio Dibásico", formula: "K₂HPO₄", forma: "solido", MM: 174.18 }
    },
    {
        nome: "Tris (Tris Base / Tris HCl)",
        pKa: 8.06, // a 25°C
        rangeUtil: [7.1, 9.1],
        componenteAcido: { nome: "Tris HCl", formula: "C₄H₁₁NO₃·HCl", forma: "solido", MM: 157.60 },
        componenteBase: { nome: "Tris Base", formula: "C₄H₁₁NO₃", forma: "solido", MM: 121.14 }
    },
    {
        nome: "Citrato (Ácido Cítrico / Citrato de Sódio)",
        // Ácido cítrico tem 3 pKas: ~3.13, ~4.76, ~6.40. Usaremos o segundo para este exemplo.
        pKa: 4.76, // pKa2
        rangeUtil: [3.8, 5.8], // Faixa útil para pKa2
        // CUIDADO: Qual sal usar? Monosódico, disódico, trisódico? Afeta MM e qual pKa é relevante.
        // Exemplo usando Ácido Cítrico Monohidratado e Citrato Trissódico Dihidratado
        componenteAcido: { nome: "Ácido Cítrico Monohidratado", formula: "C₆H₈O₇·H₂O", forma: "solido", MM: 210.14 },
        componenteBase: { nome: "Citrato Trissódico Dihidratado", formula: "C₆H₅Na₃O₇·2H₂O", forma: "solido", MM: 294.10 }
        // NOTA: Preparar tampão citrato pode ser complexo devido aos múltiplos pKas.
        // Esta entrada simplifica, mas pode não ser ideal para todos os pHs desejados na faixa do citrato.
    },
    {
        nome: "HEPES",
        pKa: 7.48, // a 25°C
        rangeUtil: [6.8, 8.2],
        // Frequentemente preparado ajustando pH da forma ácida livre com NaOH, ou misturando formas ácida e de sal sódico.
        // Assumindo mistura das duas formas sólidas:
        componenteAcido: { nome: "HEPES (Forma Ácida Livre)", formula: "C₈H₁₈N₂O₄S", forma: "solido", MM: 238.31 },
        componenteBase: { nome: "HEPES (Sal Sódico)", formula: "C₈H₁₇N₂NaO₄S", forma: "solido", MM: 260.29 }
    }
    // Adicionar mais buffers comuns: MES, MOPS, Carbonato/Bicarbonato, Glicina, etc.
];


// --- Funções de Navegação ---

function toggleCustomMassaMolar() {
    var compostoSelect = document.getElementById('composto');
    var customMassaMolarGroup = document.getElementById('custom-massa-molar-group');
    
    if (compostoSelect.value === 'custom') {
        customMassaMolarGroup.style.display = 'block';
    } else {
        customMassaMolarGroup.style.display = 'none';
    }
}

function showSection(sectionId) {
    document.querySelectorAll('.calculator-section').forEach(section => section.classList.remove('active'));
    document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    document.querySelector(`.nav-button[onclick="showSection('${sectionId}')"]`).classList.add('active');
}

// --- Funções Calculadora de Concentração ---
function preencherCompostos() {
    compostos.sort((a, b) => a.nome.localeCompare(b.nome));
    compostos.forEach(composto => {
        const option = document.createElement('option');
        option.value = composto.massaMolar;
        option.textContent = `${composto.nome} (${composto.formula}) - ${composto.massaMolar.toFixed(2)} g/mol`;
        selectCompostoEl.appendChild(option);
    });
}

function validarEntradasConcentracao(massaMolar, ...valores) {
    if ((!massaMolar && massaMolar !== 0) && selectCompostoEl.value !== 'custom') {
        alert("⚠️ Selecione um composto primeiro!");
        return false;
    }
    if (valores.some(v => isNaN(v) || v <= 0)) {
        alert("⚠️ Por favor, preencha todos os campos numéricos com valores positivos!");
        return false;
    }
    return true;
}

function calcularMassa() {
    const molaridadeInput = document.getElementById('molaridade').value.trim();
    const volumeInput = document.getElementById('volume2').value.trim();
    const hidratacaoInput = document.getElementById('hidratacao').value.trim();
    
    const molaridade = parseFloat(molaridadeInput);
    const volume = parseFloat(volumeInput);
    const hidratacao = parseInt(hidratacaoInput) || 0;
    let massaMolar;
    
    if (!molaridadeInput || !volumeInput) {
        alert("⚠️ Preencha os campos de molaridade e volume.");
        return;
    }
    
    if (selectCompostoEl.value === 'custom') {
        const customMassaMolarInput = document.getElementById('custom-massa-molar').value.trim();
        if (!customMassaMolarInput) {
            alert("⚠️ Preencha a massa molar do composto.");
            return;
        }
        massaMolar = parseFloat(customMassaMolarInput);
    } else {
        massaMolar = parseFloat(selectCompostoEl.value);
    }
    
    const resultadoDiv = document.getElementById('resultado-massa');
    const pureza = parseFloat(document.getElementById('pureza').value || "100") / 100;

    if (!validarEntradasConcentracao(massaMolar, molaridade, volume)) {
        resultadoDiv.innerHTML = ""; return;
    }
    
    // Adiciona a massa da água de hidratação (18.015 g/mol por cada H₂O)
    const massaMolarTotal = massaMolar + (hidratacao * 18.015);
    
    const massa = (molaridade * massaMolarTotal * volume) / pureza;

    resultadoDiv.innerHTML = `Massa necessária = <span class="valor-calculado">${massa.toFixed(4)}</span> <span class="unidade">g</span>`;
    if (hidratacao > 0) {
        resultadoDiv.innerHTML += `<br><small>Massa molar considerada: ${massaMolar.toFixed(2)} g/mol (composto) + ${(hidratacao * 18.015).toFixed(2)} g/mol (${hidratacao}H₂O) = ${massaMolarTotal.toFixed(2)} g/mol</small>`;
    }
}


// --- Funções Calculadora de Diluição ---
function toggleCustomConcentracao() {
    if (selectAcidoEl.value === 'custom') {
        customConcentracaoGroup.style.display = 'block';
        customConcentracaoInput.required = true;
        customConcentracaoInput.focus();
    } else {
        customConcentracaoGroup.style.display = 'none';
        customConcentracaoInput.required = false;
        customConcentracaoInput.value = '';
    }
}

function calcularDiluicao() {
    const selectedOption = selectAcidoEl.options[selectAcidoEl.selectedIndex];
    const concentracaoDesejada = parseFloat(document.getElementById('concentracaoDesejada').value); // C2
    const volumeDesejado = parseFloat(document.getElementById('volumeDesejado').value); // V2
    const resultadoDiv = document.getElementById('resultado-diluir');
    let concentracaoEstoque; // C1
    if (selectAcidoEl.value === 'custom') {
        concentracaoEstoque = parseFloat(customConcentracaoInput.value);
    } else if (selectedOption.dataset.concentracao) {
        concentracaoEstoque = parseFloat(selectedOption.dataset.concentracao);
    } else {
        alert("⚠️ Selecione uma solução estoque ou escolha 'Outro' e insira a concentração!");
        resultadoDiv.innerHTML = ""; return;
    }
    if (isNaN(concentracaoEstoque) || concentracaoEstoque <= 0 || isNaN(concentracaoDesejada) || concentracaoDesejada <= 0 || isNaN(volumeDesejado) || volumeDesejado <= 0) {
        alert("⚠️ Preencha todos os campos com valores numéricos positivos!");
        resultadoDiv.innerHTML = ""; return;
    }
    if (concentracaoDesejada >= concentracaoEstoque) {
        alert("⚠️ A concentração desejada deve ser menor que a concentração do estoque para uma diluição!");
        resultadoDiv.innerHTML = ""; return;
    }
    const V1_litros = (concentracaoDesejada * volumeDesejado) / concentracaoEstoque;
    const V1_ml = V1_litros * 1000;
    const volumeAgua = (volumeDesejado - V1_litros) * 1000;
    resultadoDiv.innerHTML = `        
    Para preparar <strong>${volumeDesejado.toFixed(2)} L </strong> da solução <strong>${concentracaoDesejada.toFixed(3)}</strong> M:
    Volume necessário do estoque (<strong>${concentracaoEstoque.toFixed(2)} M</strong>):  <span class="valor-calculado"> ${V1_ml.toFixed(3)} mL</span>
    <small><strong>Lembre-se:</strong> adicione o ácido à água, nunca o contrário, especialmente para ácidos fortes!</small><br>
`;

}

// --- Funções Calculadora de Meios ---
function preencherMeios() {
    meios.sort((a, b) => a.nome.localeCompare(b.nome));
    meios.forEach((meio, index) => {
        const option = document.createElement('option');
        option.value = index; // Usando o índice como value
        option.textContent = meio.nome;
        selectMeioEl.appendChild(option);
    });
}

function calcularPreparoMeio() {
    const meioIndex = parseInt(selectMeioEl.value);
    const volumeInput = parseFloat(document.getElementById('volumeMeio').value); // Volume em mL
    const resultadoDiv = document.getElementById('resultado-meios');
    if (isNaN(meioIndex) || selectMeioEl.value === "") {
        alert("⚠️ Selecione o meio de cultura!");
        resultadoDiv.innerHTML = ""; return;
    }
    if (isNaN(volumeInput) || volumeInput <= 0) {
        alert("⚠️ Digite um volume válido em mL!");
        resultadoDiv.innerHTML = ""; return;
    }
    const meioSelecionado = meios[meioIndex];
    let instrucaoFinal = meioSelecionado.instrucao;
    const volumeEmLitros = volumeInput / 1000;

    // Ajuste para Água Peptonada Tamponada
    if (meioSelecionado.nome.includes("Água Peptonada Tamponada")) {
        const p1 = (10 * volumeEmLitros).toFixed(3); // Peptona
        const p2 = (5 * volumeEmLitros).toFixed(3);  // NaCl
        const p3 = (3.5 * volumeEmLitros).toFixed(3);// Na2HPO4
        const p4 = (1.5 * volumeEmLitros).toFixed(3);// KH2PO4
        instrucaoFinal = instrucaoFinal
            .replace('{p1}', p1).replace('{p2}', p2)
            .replace('{p3}', p3).replace('{p4}', p4)
            .replace(/{volume}/g, volumeInput.toFixed(0)); // Substitui {volume} globalmente
    }
  
    // Ajuste para Caldo TT (iodo e verde brilhante)
    else if (meioSelecionado.nome.includes("Caldo TT")) {
        const iodoMl = (20 * volumeEmLitros).toFixed(2);
        const vbMl = (10 * volumeEmLitros).toFixed(2);
        const pesoNecessario = (meioSelecionado.fator * volumeEmLitros).toFixed(3);
        instrucaoFinal = instrucaoFinal
            .replace('{peso}', pesoNecessario)
            .replace('{meio}', meioSelecionado.nome)
            .replace('{volume}', volumeInput.toFixed(0)) // Adiciona o volume de água
            .replace('20mL de solução iodo-iodeto (...) POR LITRO', `<span class="destaque">${iodoMl}mL</span> de solução iodo-iodeto`) // Atualiza quantidade
            .replace('10mL de solução a 0.1% de Verde Brilhante (opcional) POR LITRO', `<span class="destaque">${vbMl}mL</span> de Verde Brilhante 0.1% (opcional)`); // Atualiza quantidade
    }
    // Cálculos normais baseados em g/L
    else if (meioSelecionado.fator > 0) {
        const pesoNecessario = (meioSelecionado.fator * volumeEmLitros).toFixed(3);
        instrucaoFinal = instrucaoFinal
            .replace('{peso}', pesoNecessario)
            .replace('{meio}', meioSelecionado.nome)
            .replace('{volume}', volumeInput.toFixed(0)); // Adiciona o volume de água
    } else {
        // Casos sem fator específico (raro, talvez remover fator:0)
        instrucaoFinal = instrucaoFinal.replace('{meio}', meioSelecionado.nome);
        if (volumeInput !== 1000) {
            instrucaoFinal += `<br><br><strong>Atenção:</strong> Verifique as instruções do fabricante para ajustar as quantidades para o volume de ${volumeInput}mL.`;
        }
    }
    resultadoDiv.className = 'resultado'; // Reseta classe
    resultadoDiv.innerHTML = instrucaoFinal;
}


// --- Funções Calculadora de Tampão ---

function preencherSistemasTampao() {
    sistemasTampao.sort((a, b) => a.nome.localeCompare(b.nome));
    sistemasTampao.forEach((sistema, index) => {
        const option = document.createElement('option');
        option.value = index; // Usa o índice como valor
        option.textContent = `${sistema.nome} (pKa: ${sistema.pKa.toFixed(2)}, Faixa útil: ${sistema.rangeUtil[0]}-${sistema.rangeUtil[1]})`;
        option.dataset.pka = sistema.pKa; // Armazena pKa para fácil acesso
        option.dataset.minPh = sistema.rangeUtil[0];
        option.dataset.maxPh = sistema.rangeUtil[1];
        selectSistemaTampaoEl.appendChild(option);
    });
    // Adiciona a opção manual no final do select preenchido
    const manualOption = document.createElement('option');
    manualOption.value = 'manual';
    manualOption.textContent = 'Outro (pKa Manual)';
    selectSistemaTampaoEl.appendChild(manualOption);
}

function toggleManualPka() {
    const selectedValue = selectSistemaTampaoEl.value;
    componentesInfoDiv.innerHTML = ''; // Limpa info anterior
    resultadoTampaoDiv.innerHTML = ''; // Limpa resultado anterior
    resultadoTampaoDiv.className = 'resultado'; // Reseta classe de erro

    if (selectedValue === 'manual') {
        manualPkaGroup.style.display = 'block';
        manualPkaInput.required = true;
        manualPkaInput.focus();
        document.getElementById('phDesejado').placeholder = "Ex: 7.0"; // Placeholder genérico
    } else if (selectedValue !== "") {
        manualPkaGroup.style.display = 'none';
        manualPkaInput.required = false;
        manualPkaInput.value = '';
        // Atualiza placeholder do pH e mostra info dos componentes
        const selectedOption = selectSistemaTampaoEl.options[selectSistemaTampaoEl.selectedIndex];
        const minPh = selectedOption.dataset.minPh;
        const maxPh = selectedOption.dataset.maxPh;
        document.getElementById('phDesejado').placeholder = `Entre ${minPh} e ${maxPh}`;

        // Mostra info dos componentes
        const sistema = sistemasTampao[parseInt(selectedValue)];
        componentesInfoDiv.innerHTML = `
            <p><strong>Componentes a serem usados:</strong></p>
            <ul>
                <li>Forma Ácida: ${sistema.componenteAcido.nome} (<code>${sistema.componenteAcido.formula}</code>)</li>
                <li>Forma Básica: ${sistema.componenteBase.nome} (<code>${sistema.componenteBase.formula}</code>)</li>
            </ul>
            ${sistema.componenteAcido.forma === 'liquido' || sistema.componenteBase.forma === 'liquido' ? '<small>Nota: Para componentes líquidos, o cálculo fornecerá volume baseado na pureza e densidade padrão. Verifique os dados do seu reagente.</small>' : ''}
        `;

    } else { // "-- Selecione --"
        manualPkaGroup.style.display = 'none';
        manualPkaInput.required = false;
        manualPkaInput.value = '';
        document.getElementById('phDesejado').placeholder = "Ex: 7.4";
    }
}

function calcularTampao() {
    const sistemaIndex = selectSistemaTampaoEl.value;
    const phDesejado = parseFloat(document.getElementById('phDesejado').value);
    const concentracaoFinal = parseFloat(document.getElementById('concentracaoFinal').value);
    const volumeFinal = parseFloat(document.getElementById('volumeFinalTampao').value);
    let pKa;
    let sistemaSelecionado = null;

    resultadoTampaoDiv.innerHTML = ""; // Limpa resultado anterior
    resultadoTampaoDiv.className = 'resultado'; // Reseta classe de erro

    // --- Validação e Obtenção de pKa ---
    if (sistemaIndex === "") {
        alert("⚠️ Por favor, selecione um sistema tampão.");
        return;
    }

    if (sistemaIndex === 'manual') {
        pKa = parseFloat(manualPkaInput.value);
        if (isNaN(pKa)) {
            alert("⚠️ Por favor, insira um valor de pKa manual válido.");
            return;
        }
        // Para pKa manual, não temos info de componentes pré-definida
        componentesInfoDiv.innerHTML = '<p>Usando pKa manual. Certifique-se de ter os componentes ácido/base corretos.</p>';

    } else {
        sistemaSelecionado = sistemasTampao[parseInt(sistemaIndex)];
        pKa = sistemaSelecionado.pKa;
        // Validação extra da faixa de pH
        if (phDesejado < sistemaSelecionado.rangeUtil[0] || phDesejado > sistemaSelecionado.rangeUtil[1]) {
            resultadoTampaoDiv.className = 'resultado erro'; // Adiciona classe de erro
            resultadoTampaoDiv.innerHTML = `⚠️ <strong>Atenção:</strong> O pH desejado (${phDesejado.toFixed(2)}) está fora da faixa útil recomendada (${sistemaSelecionado.rangeUtil[0]} - ${sistemaSelecionado.rangeUtil[1]}) para este sistema tampão (pKa ${pKa.toFixed(2)}). O tampão pode ter baixa capacidade tamponante.`;
            // Não impede o cálculo, mas avisa o usuário. Poderia retornar aqui se quisesse ser mais estrito.
            // return;
        }
    }

    if (isNaN(phDesejado) || isNaN(concentracaoFinal) || concentracaoFinal <= 0 || isNaN(volumeFinal) || volumeFinal <= 0) {
        alert("⚠️ Verifique os valores de pH, Concentração Final (>0) e Volume Final (>0).");
        return;
    }

    // --- Cálculo Henderson-Hasselbalch ---
    // pH = pKa + log([A-]/[HA])  =>  log([A-]/[HA]) = pH - pKa
    const razao_A_HA = Math.pow(10, phDesejado - pKa); // [A-]/[HA]

    // [A-] + [HA] = ConcentracaoFinal (C)
    // [A-] = razao * [HA]
    // (razao * [HA]) + [HA] = C  =>  [HA] * (razao + 1) = C
    const concHA = concentracaoFinal / (razao_A_HA + 1); // Concentração molar do componente ácido
    const concA = concentracaoFinal - concHA;           // Concentração molar do componente básico

    const molesHA = concHA * volumeFinal;
    const molesA = concA * volumeFinal;

    // --- Cálculo das Quantidades ---
    let resultadoTexto = `
        Para preparar <span class="destaque">${volumeFinal.toFixed(3)} L</span> de tampão <span class="destaque">${concentracaoFinal.toFixed(3)} M</span> com pH <span class="destaque">${phDesejado.toFixed(2)}</span> (pKa usado: ${pKa.toFixed(2)}):
        <ul>
    `;

    if(sistemaSelecionado) { // Se foi selecionado um sistema da lista
        const compAcido = sistemaSelecionado.componenteAcido;
        const compBase = sistemaSelecionado.componenteBase;
        let quantidadeAcidoStr = "";
        let quantidadeBaseStr = "";

        // Calcula quantidade do componente ácido (HA)
        if (compAcido.forma === 'solido') {
            const massaHA = molesHA * compAcido.MM;
            quantidadeAcidoStr = `<span class="valor-calculado">${massaHA.toFixed(4)}</span> <span class="unidade">g</span> de ${compAcido.nome} (<code>${compAcido.formula}</code>)`;
        } else if (compAcido.forma === 'liquido') {
            if (compAcido.densidade && compAcido.pureza) {
                const massaPuraHA = molesHA * compAcido.MM;
                const volumeHA_mL = (massaPuraHA / (compAcido.densidade * compAcido.pureza)); // em mL
                quantidadeAcidoStr = `<span class="valor-calculado">${volumeHA_mL.toFixed(3)}</span> <span class="unidade">mL</span> de ${compAcido.nome} (<code>${compAcido.formula}</code>, assumindo pureza ${compAcido.pureza*100}% e densidade ${compAcido.densidade} g/mL)`;
            } else {
                const massaPuraHA = molesHA * compAcido.MM;
                quantidadeAcidoStr = `<span class="valor-calculado">${massaPuraHA.toFixed(4)}</span> <span class="unidade">g</span> (puros) de ${compAcido.nome}. Calcule o volume baseado na densidade/pureza do seu estoque.`;
            }
        } else { // Forma desconhecida
            quantidadeAcidoStr = `<span class="valor-calculado">${molesHA.toFixed(5)}</span> <span class="unidade">mols</span> de ${compAcido.nome}`;
        }

        // Calcula quantidade do componente básico (A-)
        if (compBase.forma === 'solido') {
            const massaA = molesA * compBase.MM;
            quantidadeBaseStr = `<span class="valor-calculado">${massaA.toFixed(4)}</span> <span class="unidade">g</span> de ${compBase.nome} (<code>${compBase.formula}</code>)`;
        } else if (compBase.forma === 'liquido') {
            if (compBase.densidade && compBase.pureza) {
                const massaPuraA = molesA * compBase.MM;
                const volumeA_mL = (massaPuraA / (compBase.densidade * compBase.pureza)); // em mL
                quantidadeBaseStr = `<span class="valor-calculado">${volumeA_mL.toFixed(3)}</span> <span class="unidade">mL</span> de ${compBase.nome} (<code>${compBase.formula}</code>, assumindo pureza ${compBase.pureza*100}% e densidade ${compBase.densidade} g/mL)`;
            } else {
                const massaPuraA = molesA * compBase.MM;
                quantidadeBaseStr = `<span class="valor-calculado">${massaPuraA.toFixed(4)}</span> <span class="unidade">g</span> (puros) de ${compBase.nome}. Calcule o volume baseado na densidade/pureza do seu estoque.`;
            }
        } else { // Forma desconhecida
            quantidadeBaseStr = `<span class="valor-calculado">${molesA.toFixed(5)}</span> <span class="unidade">mols</span> de ${compBase.nome}`;
        }

        resultadoTexto += `<li>Misturar: ${quantidadeAcidoStr}</li>`;
        resultadoTexto += `<li>E: ${quantidadeBaseStr}</li>`;

    } else { // Caso de pKa manual
        resultadoTexto += `
            <li>Componente Ácido (HA): <span class="valor-calculado">${molesHA.toFixed(5)}</span> <span class="unidade">mols</span></li>
            <li>Componente Básico (A⁻): <span class="valor-calculado">${molesA.toFixed(5)}</span> <span class="unidade">mols</span></li>
            <li><small>Converta os mols para massa ou volume usando a massa molar e dados (pureza/densidade) dos seus reagentes específicos.</small></li>
        `;
    }

    resultadoTexto += `</ul>`;
    resultadoTexto += `<br><small><strong>Instruções Gerais:</strong> Dissolva os componentes em uma quantidade de água destilada/deionizada menor que o volume final (ex: ~80% do V<sub>final</sub>). Misture bem. Verifique o pH com um medidor calibrado e ajuste cuidadosamente com ácido ou base diluída (ex: HCl ou NaOH 0.1M), se necessário. Complete o volume para <span class="destaque">${volumeFinal.toFixed(3)} L</span> com água e homogeneize.</small>`;

    // Adiciona aviso de pH fora da faixa, se aplicável e não foi mostrado antes
    if (sistemaSelecionado && (phDesejado < sistemaSelecionado.rangeUtil[0] || phDesejado > sistemaSelecionado.rangeUtil[1]) && !resultadoTampaoDiv.classList.contains('erro') ) {
        resultadoTexto += `<br><br><strong style='color:#e74c3c;'>Aviso:</strong> O pH desejado está fora da faixa ideal para este tampão, a capacidade tamponante pode ser reduzida.`;
        resultadoTampaoDiv.className = 'resultado erro'; // Marca como aviso/erro
    }

    resultadoTampaoDiv.innerHTML = resultadoTexto;
}
    function mostrarPreparoIndicador() {
    const seletor = document.getElementById("indicadorSelect");
    const valor = seletor.value;
    const resultado = document.getElementById("resultado-indicador");

    let texto = "";
    switch (valor) {
        case "fenolftaleina":
            texto = `💡 <strong>Fenolftaleína</strong>:<br>
                     Dissolver <strong>1 g</strong> em <strong>100 mL</strong> de etanol 95%.<br>
                     Agitar e armazenar em frasco âmbar.`;
            break;
        case "alaranjadoMetila":
            texto = `💡 <strong>Alaranjado de Metila</strong>:<br>
                     Dissolver <strong>0,5 g</strong> em <strong>100 mL</strong> de água destilada.<br>
                     Agitar e guardar protegido da luz.`;
            break;
        case "vermelhoMetila":
            texto = `💡 <strong>Vermelho de Metila</strong>:<br>
                     Dissolver <strong>0,1 g</strong> em <strong>100 mL</strong> de álcool 70% ou água destilada.`;
            break;
        case "azulBromotimol":
            texto = `💡 <strong>Azul de Bromotimol</strong>:<br>
                     Dissolver <strong>0,1 g</strong> em <strong>50 mL</strong> de etanol e completar com água até 100 mL.`;
            break;
        case "verdeBromocresol":
            texto = `💡 <strong>Verde de Bromocresol</strong>:<br>
                     Dissolver <strong>0,04 g</strong> em <strong>100 mL</strong> de etanol 95% ou água com etanol.`;
            break;
        case "negroEriocromoT":
            texto = `💡 <strong>Negro de Eriocromo T</strong>:<br>
                     Dissolver <strong>0,5 g</strong> em <strong>50 mL</strong> de etanol + 50 mL de água<br>
                     OU preparar mistura sólida com <strong>100 g</strong> de NaCl.`;
            break;
        case "azulMetileno":
            texto = `💡 <strong>Azul de Metileno</strong>:<br>
                     Dissolver <strong>0,1 g</strong> em <strong>100 mL</strong> de água destilada.<br>
                     Armazenar protegido da luz.`;
            break;
        case "timolftaleina":
            texto = `💡 <strong>Timolftaleína</strong>:<br>
                     Dissolver <strong>1 g</strong> em <strong>100 mL</strong> de etanol 95%.<br>
                     Solução azul em meio básico.`;
            break;
        default:
            texto = "";
    }

    resultado.innerHTML = texto ? `<div>${texto}</div>` : "";
}


// --- Inicialização ---
document.addEventListener('DOMContentLoaded', () => {
    // Preenche seletores
    preencherCompostos();
    preencherMeios();
    preencherSistemasTampao(); // Novo

    // Adiciona listeners
    selectAcidoEl.addEventListener('change', toggleCustomConcentracao);
    selectSistemaTampaoEl.addEventListener('change', toggleManualPka); // Novo

    // Garante que a primeira seção esteja visível ao carregar
    showSection('pesar');
}


);
