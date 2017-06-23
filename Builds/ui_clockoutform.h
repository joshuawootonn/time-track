/********************************************************************************
** Form generated from reading UI file 'clockoutform.ui'
**
** Created by: Qt User Interface Compiler version 5.9.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_CLOCKOUTFORM_H
#define UI_CLOCKOUTFORM_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QComboBox>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QSpacerItem>
#include <QtWidgets/QTableWidget>
#include <QtWidgets/QTextEdit>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_ClockoutForm
{
public:
    QGridLayout *gridLayout;
    QWidget *bigwidger;
    QVBoxLayout *verticalLayout_2;
    QHBoxLayout *horizontalLayout;
    QVBoxLayout *verticalLayout;
    QHBoxLayout *horizontalLayout_4;
    QLabel *label_3;
    QComboBox *Projects;
    QHBoxLayout *horizontalLayout_5;
    QLabel *label_4;
    QComboBox *Items;
    QHBoxLayout *horizontalLayout_6;
    QLabel *label_5;
    QComboBox *Hours;
    QComboBox *Minutes;
    QHBoxLayout *horizontalLayout_8;
    QPushButton *Add;
    QPushButton *Delete;
    QHBoxLayout *horizontalLayout_7;
    QLabel *label_6;
    QComboBox *Lunch;
    QVBoxLayout *verticalLayout_3;
    QTableWidget *Sections;
    QWidget *DescriptionWidget;
    QHBoxLayout *horizontalLayout_3;
    QLabel *label_2;
    QTextEdit *Description;
    QHBoxLayout *horizontalLayout_2;
    QLabel *label;
    QLabel *timeLeft;
    QSpacerItem *horizontalSpacer;
    QPushButton *FinishedButton;
    QPushButton *CancelButton;

    void setupUi(QWidget *ClockoutForm)
    {
        if (ClockoutForm->objectName().isEmpty())
            ClockoutForm->setObjectName(QStringLiteral("ClockoutForm"));
        ClockoutForm->resize(672, 370);
        QFont font;
        font.setFamily(QStringLiteral("Calibri"));
        ClockoutForm->setFont(font);
        ClockoutForm->setStyleSheet(QLatin1String("QWidget#ClockoutForm{\n"
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
"\n"
"QStackedWidget{\n"
"margin:0px;\n"
"padding:0px;\n"
"}\n"
"\n"
"\n"
"QWidget{\n"
"\n"
"margin:0px;\n"
"padding:0px;\n"
"}\n"
"QWidget#bigwidger{\n"
"background-color:#E5EAE7;\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"\n"
"QTableWidget{\n"
"border:none;\n"
"}\n"
"QTextEdit{\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"QPushButton{\n"
"padding:3px;\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"}\n"
"QPushButton:hover:!pressed{\n"
"background-color:#E4E9EB;\n"
"}\n"
"\n"
"\n"
"QDateTimeEdit{\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"}\n"
"QDateEditTime:hover{\n"
"border:none;\n"
"background-color:#E4E9EB;\n"
"}\n"
"QDateEditTime::drop-down{\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"QComboBox{\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"}\n"
"QComboBox:hover {\n"
"background-color:#E4E9EB;\n"
"}\n"
"QComboBox:drop-down{\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"QRadioB"
                        "utton{\n"
"padding:0px;\n"
"margin:0px;\n"
"}\n"
"\n"
"\n"
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
""));
        gridLayout = new QGridLayout(ClockoutForm);
        gridLayout->setObjectName(QStringLiteral("gridLayout"));
        bigwidger = new QWidget(ClockoutForm);
        bigwidger->setObjectName(QStringLiteral("bigwidger"));
        verticalLayout_2 = new QVBoxLayout(bigwidger);
        verticalLayout_2->setObjectName(QStringLiteral("verticalLayout_2"));
        horizontalLayout = new QHBoxLayout();
        horizontalLayout->setObjectName(QStringLiteral("horizontalLayout"));
        verticalLayout = new QVBoxLayout();
        verticalLayout->setObjectName(QStringLiteral("verticalLayout"));
        verticalLayout->setSizeConstraint(QLayout::SetMinimumSize);
        horizontalLayout_4 = new QHBoxLayout();
        horizontalLayout_4->setObjectName(QStringLiteral("horizontalLayout_4"));
        label_3 = new QLabel(bigwidger);
        label_3->setObjectName(QStringLiteral("label_3"));
        QSizePolicy sizePolicy(QSizePolicy::Fixed, QSizePolicy::Preferred);
        sizePolicy.setHorizontalStretch(0);
        sizePolicy.setVerticalStretch(0);
        sizePolicy.setHeightForWidth(label_3->sizePolicy().hasHeightForWidth());
        label_3->setSizePolicy(sizePolicy);
        label_3->setMinimumSize(QSize(100, 0));

        horizontalLayout_4->addWidget(label_3);

        Projects = new QComboBox(bigwidger);
        Projects->setObjectName(QStringLiteral("Projects"));
        Projects->setMinimumSize(QSize(200, 0));
        Projects->setMaximumSize(QSize(200, 16777215));
        Projects->setSizeAdjustPolicy(QComboBox::AdjustToContents);

        horizontalLayout_4->addWidget(Projects);


        verticalLayout->addLayout(horizontalLayout_4);

        horizontalLayout_5 = new QHBoxLayout();
        horizontalLayout_5->setObjectName(QStringLiteral("horizontalLayout_5"));
        label_4 = new QLabel(bigwidger);
        label_4->setObjectName(QStringLiteral("label_4"));
        label_4->setMinimumSize(QSize(100, 0));

        horizontalLayout_5->addWidget(label_4);

        Items = new QComboBox(bigwidger);
        Items->setObjectName(QStringLiteral("Items"));
        Items->setMinimumSize(QSize(200, 0));
        Items->setMaximumSize(QSize(200, 16777215));

        horizontalLayout_5->addWidget(Items);


        verticalLayout->addLayout(horizontalLayout_5);

        horizontalLayout_6 = new QHBoxLayout();
        horizontalLayout_6->setObjectName(QStringLiteral("horizontalLayout_6"));
        label_5 = new QLabel(bigwidger);
        label_5->setObjectName(QStringLiteral("label_5"));
        label_5->setMinimumSize(QSize(100, 0));

        horizontalLayout_6->addWidget(label_5);

        Hours = new QComboBox(bigwidger);
        Hours->setObjectName(QStringLiteral("Hours"));
        Hours->setMinimumSize(QSize(100, 0));
        Hours->setMaximumSize(QSize(100, 16777215));

        horizontalLayout_6->addWidget(Hours);

        Minutes = new QComboBox(bigwidger);
        Minutes->setObjectName(QStringLiteral("Minutes"));
        Minutes->setMinimumSize(QSize(100, 0));
        Minutes->setMaximumSize(QSize(100, 16777215));

        horizontalLayout_6->addWidget(Minutes);


        verticalLayout->addLayout(horizontalLayout_6);

        horizontalLayout_8 = new QHBoxLayout();
        horizontalLayout_8->setObjectName(QStringLiteral("horizontalLayout_8"));
        Add = new QPushButton(bigwidger);
        Add->setObjectName(QStringLiteral("Add"));
        Add->setMinimumSize(QSize(100, 0));
        Add->setMaximumSize(QSize(250, 16777215));

        horizontalLayout_8->addWidget(Add);

        Delete = new QPushButton(bigwidger);
        Delete->setObjectName(QStringLiteral("Delete"));
        Delete->setMinimumSize(QSize(100, 0));
        Delete->setMaximumSize(QSize(250, 16777215));

        horizontalLayout_8->addWidget(Delete);


        verticalLayout->addLayout(horizontalLayout_8);

        horizontalLayout_7 = new QHBoxLayout();
        horizontalLayout_7->setObjectName(QStringLiteral("horizontalLayout_7"));
        label_6 = new QLabel(bigwidger);
        label_6->setObjectName(QStringLiteral("label_6"));
        label_6->setMinimumSize(QSize(100, 0));

        horizontalLayout_7->addWidget(label_6);

        Lunch = new QComboBox(bigwidger);
        Lunch->setObjectName(QStringLiteral("Lunch"));
        Lunch->setMinimumSize(QSize(200, 0));
        Lunch->setMaximumSize(QSize(200, 16777215));

        horizontalLayout_7->addWidget(Lunch);


        verticalLayout->addLayout(horizontalLayout_7);


        horizontalLayout->addLayout(verticalLayout);

        verticalLayout_3 = new QVBoxLayout();
        verticalLayout_3->setObjectName(QStringLiteral("verticalLayout_3"));
        Sections = new QTableWidget(bigwidger);
        Sections->setObjectName(QStringLiteral("Sections"));
        Sections->setMinimumSize(QSize(316, 0));
        Sections->verticalHeader()->setMinimumSectionSize(30);

        verticalLayout_3->addWidget(Sections);

        DescriptionWidget = new QWidget(bigwidger);
        DescriptionWidget->setObjectName(QStringLiteral("DescriptionWidget"));
        DescriptionWidget->setMaximumSize(QSize(16777215, 35));
        horizontalLayout_3 = new QHBoxLayout(DescriptionWidget);
        horizontalLayout_3->setObjectName(QStringLiteral("horizontalLayout_3"));
        label_2 = new QLabel(DescriptionWidget);
        label_2->setObjectName(QStringLiteral("label_2"));
        label_2->setMaximumSize(QSize(16777215, 26));

        horizontalLayout_3->addWidget(label_2);

        Description = new QTextEdit(DescriptionWidget);
        Description->setObjectName(QStringLiteral("Description"));
        Description->setMaximumSize(QSize(16777215, 26));

        horizontalLayout_3->addWidget(Description);


        verticalLayout_3->addWidget(DescriptionWidget);


        horizontalLayout->addLayout(verticalLayout_3);


        verticalLayout_2->addLayout(horizontalLayout);

        horizontalLayout_2 = new QHBoxLayout();
        horizontalLayout_2->setObjectName(QStringLiteral("horizontalLayout_2"));
        label = new QLabel(bigwidger);
        label->setObjectName(QStringLiteral("label"));

        horizontalLayout_2->addWidget(label);

        timeLeft = new QLabel(bigwidger);
        timeLeft->setObjectName(QStringLiteral("timeLeft"));

        horizontalLayout_2->addWidget(timeLeft);

        horizontalSpacer = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_2->addItem(horizontalSpacer);

        FinishedButton = new QPushButton(bigwidger);
        FinishedButton->setObjectName(QStringLiteral("FinishedButton"));
        FinishedButton->setMinimumSize(QSize(100, 0));

        horizontalLayout_2->addWidget(FinishedButton);

        CancelButton = new QPushButton(bigwidger);
        CancelButton->setObjectName(QStringLiteral("CancelButton"));
        CancelButton->setMinimumSize(QSize(100, 0));

        horizontalLayout_2->addWidget(CancelButton);


        verticalLayout_2->addLayout(horizontalLayout_2);


        gridLayout->addWidget(bigwidger, 0, 0, 1, 1);


        retranslateUi(ClockoutForm);

        QMetaObject::connectSlotsByName(ClockoutForm);
    } // setupUi

    void retranslateUi(QWidget *ClockoutForm)
    {
        ClockoutForm->setWindowTitle(QApplication::translate("ClockoutForm", "Time-Track", Q_NULLPTR));
        label_3->setText(QApplication::translate("ClockoutForm", "Project:", Q_NULLPTR));
        label_4->setText(QApplication::translate("ClockoutForm", "Sub-Project:", Q_NULLPTR));
        label_5->setText(QApplication::translate("ClockoutForm", "Time Worked:", Q_NULLPTR));
        Add->setText(QApplication::translate("ClockoutForm", "Add", Q_NULLPTR));
        Delete->setText(QApplication::translate("ClockoutForm", "Delete", Q_NULLPTR));
        label_6->setText(QApplication::translate("ClockoutForm", "Lunch Taken:", Q_NULLPTR));
        label_2->setText(QApplication::translate("ClockoutForm", "Notes:", Q_NULLPTR));
        label->setText(QApplication::translate("ClockoutForm", "Time Left:", Q_NULLPTR));
        timeLeft->setText(QString());
        FinishedButton->setText(QApplication::translate("ClockoutForm", "Finish", Q_NULLPTR));
        CancelButton->setText(QApplication::translate("ClockoutForm", "Cancel", Q_NULLPTR));
    } // retranslateUi

};

namespace Ui {
    class ClockoutForm: public Ui_ClockoutForm {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_CLOCKOUTFORM_H
