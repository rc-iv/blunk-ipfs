import os


def remove_json_extension(directory):
    """
    Removes the '.json' extension from all files in the specified directory.

    Parameters:
    - directory: The path to the directory containing the files.
    """
    # Check if the directory exists
    if not os.path.exists(directory):
        print(f"The directory {directory} does not exist.")
        return

    # List all files in the directory
    for filename in os.listdir(directory):
        # Check if the current file is a .json file
        if filename.endswith('.json'):
            # Construct the full path to the current file
            old_file = os.path.join(directory, filename)

            # Construct the new file name by removing the .json extension
            new_file = os.path.join(directory, filename[:-5])

            # Rename the file
            os.rename(old_file, new_file)
            print(f"Renamed '{old_file}' to '{new_file}'")


# Usage example:
# Replace '/path/to/directory' with the path to the directory containing your JSON files.
directory_path = 'C:/Users/raysc/Desktop/Coding Projects/blast/ipfs/files/metadata'
remove_json_extension(directory_path)
