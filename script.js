// 住所の半角ハイフンを縦書き用に変換
function convertHyphensForVertical(text) {
    return text.replace(/-/g, 'ー');
}

// 全角数字・ハイフンを半角に変換する関数（郵便番号用）
function toHalfWidth(text) {
    return text.replace(/[０-９－]/g, function(s) {
        if (s === '－') return '-';
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
}

// リアルタイムプレビュー更新
function updatePreview() {
    const postalCode = document.getElementById('postalCode').value;
    const address = document.getElementById('address').value;
    const address2 = document.getElementById('address2').value;
    const company = document.getElementById('company').value; 
    const recipient = document.getElementById('recipient').value;
    const honorific = document.querySelector('input[name="honorific"]:checked').value;
    const specialService = document.querySelector('input[name="specialService"]:checked').value;
    
    // 郵便番号の表示（半角に変換）
    let formattedPostalCode = '〒' + toHalfWidth(postalCode);
    document.getElementById('previewPostalCode').textContent = formattedPostalCode;
    
    // 住所の表示（ハイフンを縦書き用に変換）
    document.getElementById('previewAddress').textContent = convertHyphensForVertical(address);
    document.getElementById('previewAddress2').textContent = convertHyphensForVertical(address2);
    
    // 会社名の表示
    document.getElementById('previewCompany').textContent = company;
    
    // 宛名の表示（宛名と敬称の間に全角スペース）
    const recipientElement = document.getElementById('previewRecipient');
    const fullRecipientText = recipient + " " + honorific;
    recipientElement.textContent = fullRecipientText;

    // 宛名が10文字以上ならフォントサイズを縮小するクラスを付与
    if (fullRecipientText.length >= 10) {
        recipientElement.classList.add('long-text');
    } else {
        recipientElement.classList.remove('long-text');
    }
    
    // 特殊取扱の表示
    const specialServiceElement = document.getElementById('previewSpecialService');
    specialServiceElement.textContent = specialService;
    
    // 特殊取扱が選択されている場合のみ赤枠を表示
    if (specialService && specialService !== '') {
        specialServiceElement.classList.add('has-service');
    } else {
        specialServiceElement.classList.remove('has-service');
    }
}

// イベントリスナーの追加
document.getElementById('postalCode').addEventListener('input', updatePreview);
document.getElementById('address').addEventListener('input', updatePreview);
document.getElementById('address2').addEventListener('input', updatePreview);
document.getElementById('company').addEventListener('input', updatePreview);
document.getElementById('recipient').addEventListener('input', updatePreview);

document.querySelectorAll('input[name="honorific"]').forEach(radio => {
    radio.addEventListener('change', updatePreview);
});

document.querySelectorAll('input[name="specialService"]').forEach(radio => {
    radio.addEventListener('change', updatePreview);
});

// 印刷関数
function printEnvelope() {
    window.print();
}

// 初期プレビュー更新
updatePreview();