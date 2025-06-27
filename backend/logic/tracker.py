import sqlite3
from datetime import datetime

DB_PATH = "db/tracker.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS stats (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT,
            type TEXT,
            amount REAL
        )
    ''')
    conn.commit()
    conn.close()

def add_stat(stat_type, amount):
    today = datetime.now().strftime("%Y-%m-%d")
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("INSERT INTO stats (date, type, amount) VALUES (?, ?, ?)", (today, stat_type, amount))
    conn.commit()
    conn.close()

def get_today_total(stat_type):
    today = datetime.now().strftime("%Y-%m-%d")
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT SUM(amount) FROM stats WHERE date=? AND type=?", (today, stat_type))
    result = c.fetchone()[0]
    conn.close()
    return result if result else 0.0

def get_summary():
    today = datetime.now().strftime("%Y-%m-%d")
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    
    summary = {}
    for stat in ["water", "sleep", "workout"]:
        c.execute("SELECT SUM(amount) FROM stats WHERE date=? AND type=?", (today, stat))
        total = c.fetchone()[0]
        summary[stat] = total if total else 0.0

    conn.close()
    return summary
