/********************************************************************************
** Form generated from reading UI file 'exportform.ui'
**
** Created by: Qt User Interface Compiler version 5.7.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_EXPORTFORM_H
#define UI_EXPORTFORM_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QComboBox>
#include <QtWidgets/QDialog>
#include <QtWidgets/QDialogButtonBox>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_ExportForm
{
public:
    QGridLayout *gridLayout;
    QDialogButtonBox *buttonBox;
    QWidget *ExcelWidget;
    QGridLayout *gridLayout_2;
    QLabel *label;
    QLineEdit *ExcelLocation;
    QPushButton *ExcelLocationChange;
    QComboBox *ExcelTableChange;
    QLabel *label_2;

    void setupUi(QDialog *ExportForm)
    {
        if (ExportForm->objectName().isEmpty())
            ExportForm->setObjectName(QStringLiteral("ExportForm"));
        ExportForm->resize(515, 124);
        ExportForm->setStyleSheet(QLatin1String("QWidget#MainForm{\n"
"\n"
"background-color:#E5EAE7;\n"
"}\n"
"*{\n"
"font-family:\"Calibri\";\n"
"font-size: 14px;\n"
"\n"
"}\n"
"\n"
"\n"
"QTabWidget{\n"
"margin:0px;\n"
"padding:0px;\n"
"border:none;\n"
"\n"
"background-color:#F1F4F5;\n"
"\n"
"}\n"
"\n"
"\n"
"QTabBar{\n"
"background-color:#F1F4F5;\n"
"border:none;\n"
"padding:10px;\n"
"}\n"
"QTabBar::tab:selected,QTabBar::tab:hover{\n"
"\n"
"color:#444946;\n"
"}\n"
"QTabBar::tab{\n"
"background-color:#E5EAE7;\n"
"\n"
"color:black;\n"
"}\n"
"QTabBar::tab:hover{\n"
"background-color:#f3f0f2;\n"
"\n"
"}\n"
"QTabBar::tab:selected{\n"
"background-color:#fcfbfb;\n"
"}\n"
"\n"
"\n"
"\n"
"\n"
"\n"
"QStackedWidget{\n"
"margin:0px;\n"
"padding:0px;\n"
"}\n"
"\n"
"\n"
"QWidget{\n"
"margin:0px;\n"
"padding:0px;\n"
"}\n"
"\n"
"\n"
"\n"
"QPushButton{\n"
"padding:3px;\n"
"border:none;\n"
"background-color:#F1F4F5;\n"
"}\n"
"QPushButton:hover,QPushButton:hover{\n"
"background-color:#E4E9EB;\n"
"}\n"
"\n"
"QPushButton#basicPageConnect:hover{\n"
"border-radius:15px;\n"
"\n"
""
                        "}\n"
"\n"
"QComboBox{\n"
"border:none;\n"
"background-color:#F1F4F5;\n"
"}\n"
"QComboBox:hover {\n"
"background-color:#E4E9EB;\n"
"}\n"
"QComboBox:drop-down{\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"QRadioButton{\n"
"padding:0px;\n"
"margin:0px;\n"
"\n"
"}\n"
"\n"
"QDateEdit{\n"
"border:none;\n"
"background-color:#F1F4F5;\n"
"}\n"
"QDateEdit:hover{\n"
"background-color:#E4E9EB;\n"
"}\n"
"QDateEdit:drop-down{\n"
"border:none;\n"
"}\n"
"QGroupBox {\n"
"    border: 0px solid gray;\n"
"	\n"
"    margin-top: 0.5em;\n"
"	margin-right:0px;\n"
"	margin-left:0px;\n"
"}\n"
"QGroupBox::title {\n"
"    subcontrol-origin: margin;\n"
"    left: 10px;\n"
"    padding: 0 3px 0 3px;\n"
"}\n"
"\n"
"QCheckBox::indicator,QRadioButton::indicator{\n"
"border:none;\n"
"background-color:#F1F4F5;\n"
"\n"
"}\n"
"\n"
"QCheckBox::indicator:checked,QRadioButton::indicator:checked{\n"
"border:none;\n"
"background-color:#8DAA91;\n"
"\n"
"}\n"
"\n"
""));
        gridLayout = new QGridLayout(ExportForm);
        gridLayout->setObjectName(QStringLiteral("gridLayout"));
        buttonBox = new QDialogButtonBox(ExportForm);
        buttonBox->setObjectName(QStringLiteral("buttonBox"));
        buttonBox->setOrientation(Qt::Horizontal);
        buttonBox->setStandardButtons(QDialogButtonBox::Cancel|QDialogButtonBox::Ok);

        gridLayout->addWidget(buttonBox, 1, 0, 1, 1);

        ExcelWidget = new QWidget(ExportForm);
        ExcelWidget->setObjectName(QStringLiteral("ExcelWidget"));
        gridLayout_2 = new QGridLayout(ExcelWidget);
        gridLayout_2->setObjectName(QStringLiteral("gridLayout_2"));
        label = new QLabel(ExcelWidget);
        label->setObjectName(QStringLiteral("label"));

        gridLayout_2->addWidget(label, 0, 0, 1, 1);

        ExcelLocation = new QLineEdit(ExcelWidget);
        ExcelLocation->setObjectName(QStringLiteral("ExcelLocation"));

        gridLayout_2->addWidget(ExcelLocation, 0, 1, 1, 1);

        ExcelLocationChange = new QPushButton(ExcelWidget);
        ExcelLocationChange->setObjectName(QStringLiteral("ExcelLocationChange"));

        gridLayout_2->addWidget(ExcelLocationChange, 0, 2, 1, 1);

        ExcelTableChange = new QComboBox(ExcelWidget);
        ExcelTableChange->setObjectName(QStringLiteral("ExcelTableChange"));

        gridLayout_2->addWidget(ExcelTableChange, 1, 1, 1, 1);

        label_2 = new QLabel(ExcelWidget);
        label_2->setObjectName(QStringLiteral("label_2"));

        gridLayout_2->addWidget(label_2, 1, 0, 1, 1);


        gridLayout->addWidget(ExcelWidget, 0, 0, 1, 1);


        retranslateUi(ExportForm);
        QObject::connect(buttonBox, SIGNAL(accepted()), ExportForm, SLOT(accept()));
        QObject::connect(buttonBox, SIGNAL(rejected()), ExportForm, SLOT(reject()));

        QMetaObject::connectSlotsByName(ExportForm);
    } // setupUi

    void retranslateUi(QDialog *ExportForm)
    {
        ExportForm->setWindowTitle(QApplication::translate("ExportForm", "Dialog", 0));
        label->setText(QApplication::translate("ExportForm", "File Location:", 0));
        ExcelLocationChange->setText(QApplication::translate("ExportForm", "+", 0));
        label_2->setText(QApplication::translate("ExportForm", "Table to Export:", 0));
    } // retranslateUi

};

namespace Ui {
    class ExportForm: public Ui_ExportForm {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_EXPORTFORM_H
