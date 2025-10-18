# -*- coding: utf-8 -*-
import os
import sys

# ファイルのエンコーディングを変換
def convert_encoding(source_file, dest_file):
    try:
        # Shift-JISで読み込み
        with open(source_file, 'r', encoding='shift_jis') as f:
            content = f.read()

        # UTF-8で保存
        with open(dest_file, 'w', encoding='utf-8') as f:
            f.write(content)

        print(f"Converted: {source_file} -> {dest_file}")
        return True
    except Exception as e:
        print(f"Error converting {source_file}: {e}")
        return False

# メイン処理
source_dir = r'C:\Claude Web Master講座\manda33\original\matrix33'
dest_dir = r'C:\Users\USER\CWM\practice\public\temp'

# 対象ファイルリスト（manda13, 18, 21を除く）
files = [
    'manda01.html', 'manda03.html', 'manda04.html', 'manda05.html',
    'manda07.html', 'manda08.html', 'manda09.html', 'manda10.html',
    'manda14.html', 'manda15.html', 'manda15-2.html', 'manda16.html',
    'manda17.html', 'manda19.html', 'manda20.html', 'manda22.html',
    'manda23.html', 'manda24.html'
]

# temp ディレクトリを作成
os.makedirs(dest_dir, exist_ok=True)

# 各ファイルを変換
for filename in files:
    source_file = os.path.join(source_dir, filename)
    dest_file = os.path.join(dest_dir, filename)

    if os.path.exists(source_file):
        convert_encoding(source_file, dest_file)
    else:
        print(f"File not found: {source_file}")

print("\nAll conversions completed!")
