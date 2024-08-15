#10

#include <iostream>
#include <fstream>
#include <sstream>
#include <string>

void findAndReplace(std::string& source, const std::string& oldWord, const std::string& newWord) {
    size_t pos = 0;
    while ((pos = source.find(oldWord, pos)) != std::string::npos) {
        source.replace(pos, oldWord.length(), newWord);
        pos += newWord.length();
    }
}

int main() {
    std::string filename;
    std::cout << "Enter the name of the text file: ";
    std::cin >> filename;
    std::ifstream inputFile(filename);
    if (!inputFile) {
        std::cerr << "Error opening file." << std::endl;
        return 1;
    }

    std::stringstream buffer;
    buffer << inputFile.rdbuf();
    std::string fileContents = buffer.str();
 
    inputFile.close(); 
    std::string oldWord, newWord;
    std::cout << "Enter the word to replace: ";
    std::cin >> oldWord;
    std::cout << "Enter the new word: ";
    std::cin >> newWord;


    findAndReplace(fileContents, oldWord, newWord); 
    std::ofstream outputFile(filename);
    if (!outputFile) {
        std::cerr << "Error opening file." << std::endl;
        return 1;
    }
    
     outputFile << fileContents;
    outputFile.close();

    std::cout << "File updated successfully." << std::endl;
 return 0;
}





