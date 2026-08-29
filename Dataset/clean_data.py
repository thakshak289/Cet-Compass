import pandas as pd

# Read the original dataset
df = pd.read_csv("final dataset.csv")

# Keep only the columns we need
df = df[
    [
        "college_name",
        "seat_type",
        "branch",
        "count",
        "max",
        "min",
        "mean"
    ]
]

# Rename columns to clear database-friendly names
df = df.rename(columns={
    "count": "record_count",
    "max": "max_cutoff",
    "min": "min_cutoff",
    "mean": "mean_cutoff"
})

# Save the cleaned dataset
df.to_csv("cleaned_cutoffs.csv", index=False)

# Display some information
print("Cleaning completed!")
print("Original rows:", len(pd.read_csv("final dataset.csv")))
print("Cleaned rows:", len(df))
print("Columns:", df.columns.tolist())
print("Output file: cleaned_cutoffs.csv")