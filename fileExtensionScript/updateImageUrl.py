import os

def replace_urls(directory):
    """
    Replaces 'https://raycook.io' with 'ipfs://bafybeicycjixjzszvkjca2wqfwzsc5kkexuvobe75noyycwmg2uzp42cmm/{i}.png'
    in all files in the specified directory, where {i} is the file name (assumed to be a number).

    Parameters:
    - directory: The path to the directory containing the files.
    """
    # Validate directory exists
    if not os.path.exists(directory):
        print(f"The directory {directory} does not exist.")
        return

    # Loop through each file in the directory
    for filename in os.listdir(directory):
        # Construct the full path to the file
        file_path = os.path.join(directory, filename)

        # Skip if it's not a file
        if not os.path.isfile(file_path):
            continue

        # Read the content of the file
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()

        # Replace 'https://raycook.io' with the new URL, using the filename (without extension) in the URL
        new_content = content.replace(
            'bafybeicycjixjzszvkjca2wqfwzsc5kkexuvobe75noyycwmg2uzp42cmm',
            "bafybeibjf6f3fvrhwphye5tee3gsbc4qcecurqqaikdmf5mogcq6tqsmdu"
        )

        # Write the updated content back to the file
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(new_content)

        print(f"Updated URLs in '{file_path}'")


# Usage example:
# Replace '/path/to/directory' with the path to your directory containing the files to update.
directory_path = 'C:/Users/raysc/Desktop/Coding Projects/blast/ipfs/files/metadata'
replace_urls(directory_path)
